
import ErrorHandelar from "../middlewares/error.js";
import User from "../models/user.js";

export const getAllUsers = (req, res, next) => {
    const users = User.find({});
    console.log(users);
}

