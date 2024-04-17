import app from "../app.js";
import ErrorHandelar from "../middlewares/error.js";
import User from "../models/user.js";
import tree from "../models/tree.js";
import passport from "passport";

// export const  createTree = async (next, owner_id, treePicture, treeName, treeDescription, treeContent, theme)=>{
    
//     if (!owner_id) {
//         return next(new ErrorHandelar())
//     } else {
        
//     }
// }

export const  createTree = (req,res,next)=>{
    res.send("sussfully inside createTree")
}