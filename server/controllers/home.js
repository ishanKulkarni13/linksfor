import ErrorHandelar from "../utils/error.js";
import { tryCatch } from "../utils/asyncTryCatch.js";

// export const homeHandelar = async(req, res) => {
//     let userID = req.user;
//     let user = await User.findById(userID)
//     res.json({ user });
// }


export const homeHandelar = tryCatch(async (req, res) => {
    let user = req.user;


    res.json(user);
})

