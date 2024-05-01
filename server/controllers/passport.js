export const localPassportLoginauthentication = (req,res,next) => {
    console.log("req is",req);
    if (!req.user ) {
        return next(new ErrorHandler("User login not sucessful"))
    }
    const user = req.user;
    res.json({user})
}