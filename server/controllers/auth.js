import app from "../app.js";
import ErrorHandelar from "../utils/error.js";
import { configPassport } from "../config/passport.js"
import User from "../models/user.js";
import Tree from "../models/tree.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import fs from "fs"

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
    const frontendUrl = process.env.FRONTEND_URL
    res.redirect(`${frontendUrl}`)
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
    console.log( email, name, username, password);
    let user;
    if (!password) {
        return next(new ErrorHandelar("Password is not provided"))
    } else if (!email) {
        return next(new ErrorHandelar("Email is not provided"))
    } else if (!username) {
        return next(new ErrorHandelar("Username is not provided"))
    }

    try {
        username = username.toLowerCase();
        email = email.toLowerCase();
        let emailUser = await User.findOne({ email });
        let usernameUser = await User.findOne({ username });
        if (emailUser) {
            return next(new ErrorHandelar(`Email already used to regester by someone with ${emailUser.authMethod}`))
        } else if (usernameUser) {
            return next(new ErrorHandelar(`Username already used to regester by someone with ${usernameUser.authMethod}`))
        }


        let profilePic;
        let path = 'http://res.cloudinary.com/kakashib2k/image/upload/v1713685024/uiccf1wbzyioazqgve5q.png';
        if (req.file) {
            path = req.file.path;
            const uploadToCloudinaryResult = await uploadToCloudinary(path);
            if (uploadToCloudinaryResult && uploadToCloudinaryResult.public_id && uploadToCloudinaryResult.url) {
                profilePic = {
                    public_id: uploadToCloudinaryResult.public_id,
                    url: uploadToCloudinaryResult.url
                };
            } else {
                profilePic = {
                    public_id: 'uiccf1wbzyioazqgve5q',
                    url: 'http://res.cloudinary.com/kakashib2k/image/upload/v1713685024/uiccf1wbzyioazqgve5q.png'
                };
            }
        } else {
            profilePic = {
                public_id: 'uiccf1wbzyioazqgve5q',
                url: 'http://res.cloudinary.com/kakashib2k/image/upload/v1713685024/uiccf1wbzyioazqgve5q.png'
            };
        }


        user = await User.create({ name, username, email, profilePic, password, authMethod: 'email' });
        let tree = await Tree.create({ owner: user._id, treeName: `@${user.name}` });
        await User.findByIdAndUpdate(user._id, { $set: { 'trees.ProfileDefaultTree': tree._id } });
        res.json({
            sucess: true,
            message: "User created sucessfuully",
            user
        });
        
    } catch (error) {
        return next(error)
    }
}