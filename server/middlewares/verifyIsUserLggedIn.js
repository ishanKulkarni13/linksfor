import ErrorHandelar from "../utils/error.js"


export const verifyIsUserLggedIn = (req, res, next) => {
    if (!req.user) {
        return next(new ErrorHandelar("Unautherrised request: Login first"))
    }
    next()
}
