import ErrorHandler from "../utils/error.js"


export const verifyIsUserLggedIn = (req, res, next) => {
    if (!req.user) {
        return next(new ErrorHandler("Unautherrised request: Login first"))
    }
    next()
}
