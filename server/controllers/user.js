
import ErrorHandelar from "../utils/error.js";
import User from "../models/user.js";
import { getUserTrees } from "./tree.js";

export const userInfo = async (req,res,next)=>{
    let user = await User.findById(req.user);
    res.json(user)
}

export const getAllUsers = async (req, res, next) => {
    const users = await User.find({});
    res.json({
        users: users
    })
}

