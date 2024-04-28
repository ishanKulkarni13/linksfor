import ErrorHandelar from "../utils/error.js";
import User from "../models/user.js";
import Tree from "../models/tree.js";

export const HandelCreateTreeGet = (req, res, next) => {
    res.render("createTree")
};

export const getUserTrees = async (req, res, next) => {
    try {
        let user = req.user;
        let trees = await Tree.find({ owner: user._id })
        res.json(trees)
    } catch (error) {
        next(new ErrorHandelar(error))
    }
}

export const createTree = async (req, res, next) => {
    let user = req.user
    let { treeName, treeDescription, treeContent, theme } = req.body;
    if (!treeName) { return next(new ErrorHandelar("Tree name is a mandatory field which is not provided")) };


    try {
        // Uploading the provided treePicture to cloudnary (if not provided or if some error occurs, treePicture wont be sent to the DB)
        let treePicture;
        let path = 'http://res.cloudinary.com/kakashib2k/image/upload/v1713685024/uiccf1wbzyioazqgve5q.png';
        if (req.file) {
            path = req.file.path;
            const uploadToCloudinaryResult = await uploadToCloudinary(path);
            if (uploadToCloudinaryResult && uploadToCloudinaryResult.public_id && uploadToCloudinaryResult.url) {
                treePicture = {
                    public_id: uploadToCloudinaryResult.public_id,
                    url: uploadToCloudinaryResult.url
                };
            } else {
                treePicture = false;
            }
        } else {
            treePicture = false;
        }

        // Construct the tree object with only provided fields
        let treeData = {
            owner: user._id,
            treeName,
        };
        // Add optional fields if provided
        if (treePicture) treeData.treePicture = treePicture;
        if (treeDescription) treeData.treeDescription = treeDescription;
        if (treeContent) treeData.treeContent = treeContent;
        if (theme) treeData.theme = theme;
        // Finally Creating Tree
        let tree = await Tree.create(treeData);
        // Adding tree to the User if he doesent have one.
        if (!(user.trees.ProfileDefaultTree)) {
            user = await User.findByIdAndUpdate(user._id, { $set: { 'trees.ProfileDefaultTree': tree._id } }, { new: true });
        }
        res.json({
            sucess: true,
            message: "Tree created sucessfully",
            tree
        })
    } catch (error) {
        next(error)
    }
}

export const editTree = (req,res,next)=>{
    res.send("welcome to the editTree feature")
}

export const getAllTrees = async (req, res, next) => {
    let trees = await Tree.find({})
    res.json(trees)
}