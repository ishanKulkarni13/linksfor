import ErrorHandelar from "../utils/error.js"

export const verfyIsAdminLoggedIn = (req, res, next) => {
    console.log(`verifying admin`);
    let isAdmin = true;
    (isAdmin) ? next() : next(new ErrorHandelar("access denied"))
}