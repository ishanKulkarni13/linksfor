
export const errorMiddleware = (err,req,res,next)=> {
    let errMessage = err.message || "internal server error";
    let errStatusCode = err.statusCode || 500;
    return res.status(errStatusCode).json({
     success:false,
     message: errMessage 
    });
 }
 