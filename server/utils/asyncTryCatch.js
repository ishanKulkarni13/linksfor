import ErrorHandelar from "./error.js";

export const tryCatch = (Passedfunction) => async (req, res, next) => {
    try {
        await Passedfunction(req, res, next); 
    } catch (error) {
        next(error); 
    }
};
