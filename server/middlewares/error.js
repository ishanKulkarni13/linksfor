class ErrorHandelar extends Error{
    constructor(message,statusCode){
        super(message);
        this.statusCode = statusCode;

    }
}

const errorMiddleware = (err,req,res,next)=> {
   message = err.message || "internal server erroe";
   statusCode = err.statusCode || 500;

   return res.status(statusCode).json({message})
}

export default ErrorHandelar;