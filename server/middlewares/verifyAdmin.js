import ErrorHandelar from "../utils/error.js"

export const verfyIsAdminLoggedIn = (req,res,next)=>{
    return next(new ErrorHandelar("you are not a admin"))
}