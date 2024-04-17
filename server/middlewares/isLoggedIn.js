import ErrorHandelar from "./error.js"


const verifyUserLggedIn = (req, res, next) => {
    if (!req.user) {
        return next(new ErrorHandelar("Unautherrised request: Login first"))
    }
    next()
}

export default verifyUserLggedIn