import User from "../models/user.js";
import ErrorHandler from "../utils/error.js";

// sarch user 
export const searchUserByUserUID = (req, res, next) => {
    res.send("Cheack the log")
};

export const searchUserByUsername = (req, res, next) => {
    res.send("Cheack the log")
};

//search tree
export const searchTreeByTreeUID = (req, res, next) => {
    res.send("Cheack the log")
};

export const searchTreeByUsername = async (req, res, next) => {
    let {username} = req.body;
    if (!username) {
        next(new ErrorHandler("Username not provided"))
    }
    try {
        const user = await User.findOne({username}).select('verified trees');
        res.json(user)
    } catch (error) {
        next(error)
    }
};

export const searchTreeByUserUID = (req, res, next) => {
    res.send("Cheack the log")
};