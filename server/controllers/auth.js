import app from "../app.js";
import ErrorHandelar from "../utils/error.js";
import { configPassport } from "../config/passport.js"
configPassport()


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

