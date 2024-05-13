import User from "../models/user.js";
import ErrorHandler from "../utils/error.js";
import Tree from '../models/tree.js'
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
    let username;
    if (!(req.body.username) && !(req.params.username)) {
        return next(new ErrorHandler("Username not provided"));
    } else{
     username = req.body.username || req.params.username
    }
    username = username.toLowerCase()
    try {
        // Find the user by username and select verified and trees fields
        const user = await User.findOne({ username }).select('verified trees _id');
        if (!user) {
            return next(new ErrorHandler("User not found"));
        }
        // const treeID = user.trees.ProfileDefaultTree;
        // console.log(treeID);
        // Find the tree whose owner is the user
        const tree = await Tree.findOne({ owner: user._id });
        if (!tree) {
            return next(new ErrorHandler("Tree not found"));
        }
        // Check if the tree visibility is public
        if (tree.treeVisibility !== "public") {
            return res.status(403).json({ success:false, message: `The tree is not public, it's locked with ${tree.treeVisibility}` , lockedWith: tree.treeVisibility });
        }

        // Prepare the response tree
        let responseTree = {
            verified: user.verified,
            UID: tree.UID,
            treeName: tree.treeName,
            treeVisibility: tree.treeVisibility,
            treePicture: tree.treePicture,
            treeBio: tree.treeBio,
            treeContent: {
                links: tree.treeContent.links.map(link => {
                    const { linkLockConfig, ...rest } = link;
                    return rest._doc;
                }),
                socials: tree.treeContent.socials,
            },
            theme: tree.theme,
        };

        if (tree.theme.selectedTheme.themeID !== 0) {
            responseTree.theme.customThemeConfig = undefined;
        }

        // Send the response
        res.json({ success: true, tree: responseTree });
    } catch (error) {
        next(error);
        console.log(error);
    }
};

export const searchTreeByUserUID = (req, res, next) => {
    res.send("Cheack the log")
};