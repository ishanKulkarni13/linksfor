
import ErrorHandelar from "../utils/error.js";
import User from "../models/user.js";
import { getUserTrees } from "./tree.js";

export const userInfo = async (req,res,next)=>{
    let user = req.user
    res.json(user)
}

export const getAllUsers = async (req, res, next) => { // for admin only
    const users = await User.find({});
    res.json({
        users: users
    })
}

