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
    let { treePicture, treeName, treeDescription, treeContent, theme } = req.body;
    if (!treeName) { return next(new ErrorHandelar("Tree name is a mandatory field which is not provided")) };

    try {
        let tree = await Tree.create({ owner: user._id, treeName });
        if (!(user.trees.ProfileDefaultTree)) {
            user = await  User.findByIdAndUpdate(user._id,{ $set: { 'trees.ProfileDefaultTree': tree._id } },{ new: true });
        }
        res.json({tree, user})
    } catch (error) {
        next(error)
    }
}

export const getAllTrees = async (req, res, next) => {
    let trees = await Tree.find({})
    res.json(trees)
}