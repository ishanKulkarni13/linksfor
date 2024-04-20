import app from "../app.js";
import ErrorHandelar from "../utils/error.js";
import { configPassport } from "../config/passport.js"
import User from "../models/user.js";
import Tree from "../models/tree.js";

configPassport()

export const handelRegester = (req, res, user) => {
    res.send("welcome to regester")
}

export const handelLogin = async (req, res, next) => {
    try {
        if (req.user) {
            res.json({
                sucess: true,
                isUserLOggedIn: true,
                authMethod: await req.user.authMethod,
            })
        } else {
            res.json({
                sucess: true,
                isUserLOggedIn: false,
            })
        }
    } catch (error) {
        next(new ErrorHandelar("Error occured while retriving user info"))
    }


}

export const handelPassportGoogleLoginCallback = (req, res, next) => {
    res.redirect("/")
}

export const logout = (req, res, next) => {
    try {
        req.logout(function (err) {
            if (err) { return next(new ErrorHandelar("error occure while logging out from logout function")); }
            res.json({
                sucess: true,
                message: "logged out"
            })
        });
    } catch (error) {
        return next(new ErrorHandelar("some error occure while logging out"))
    }
}

export const localRegesterPage = (req, res, next) => {
    res.render("localRegester")
}
export const localLoginPage = (req, res, next) => {
    res.render("localLogin")
};

export const handelPassportlocalRegester = async (req, res, next) => {
    let { email, name, username, password } = req.body;
    let user;
    if (!password) {
        return next(new ErrorHandelar("Password is not provided"))
    } else if (!email) {
        return next(new ErrorHandelar("Email is not provided"))
    } else if (!username) {
        return next(new ErrorHandelar("Username is not provided"))
    }

    try {
        let emailUser = await User.findOne({ email });
        let usernameUser = await User.findOne({ username });
        if (emailUser) {
            return next(new ErrorHandelar(`Email already used to regester by someone with ${emailUser.authMethod}`))
        } else if (usernameUser) {
            return next(new ErrorHandelar(`Username already used to regester by someone with ${usernameUser.authMethod}`))
        }

        user = await User.create({ name, username,  email, password, authMethod: 'email' });
        let tree = await Tree.create({ owner: user._id, treeName: `@${user.name}` });
        await User.findByIdAndUpdate(user._id, { $set: { 'trees.ProfileDefaultTree': tree._id } });
        res.redirect("/auth/local/login")
    } catch (error) {
        return next(error)
    }
}