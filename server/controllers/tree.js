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

export const editTree = (req, res, next) => {
    res.send("welcome to the editTree feature")
}

export const getAllTrees = async (req, res, next) => {
    let trees = await Tree.find({})
    res.json(trees)
}

export const getAdminAllTreeLinks = async (req, res, next) => {
    const userID = req.user._id;
    let treeUID = req.params.treeUID;

    try {
        let tree = await Tree.findOne({ UID: treeUID, owner: userID });

        if (!tree) { return next(new ErrorHandelar('Tree not found')) };

        res.json({ success: true, links: tree.treeContent.links })
    } catch (error) {
        console.log(error);
        next(error)
    }
}

export const addLink = async (req, res, next) => {
    let { URL, title } = req.body;
    const userID = req.user._id;
    let treeUID = req.params.linkUID
    let updatedLinkObject = { type: "link", title, URL };


    try {
        // let isTreeOfUser = await Tree
        let UpdatedTree = await Tree.findOneAndUpdate({ UID: treeUID, owner: userID }, { $push: { 'treeContent.links': { $each: [updatedLinkObject], $position: 0 } } }, { new: true });
        if (!UpdatedTree) { return next(new ErrorHandelar('Tree not found')) }
        console.log(UpdatedTree.treeContent.links);
        res.json({ success: true, links: UpdatedTree.treeContent.links })

    } catch (error) {
        console.log(error);
        next(error)
    }
}

export const deleteLink = async (req, res, next) => {
    const userID = req.user._id;
    let { linkUID, treeUID } = req.body;
    if (!linkUID) { return next(new ErrorHandelar("Didn't got linkUID")) }
    if (!treeUID) { return next(new ErrorHandelar("Didn't got treeUID")) }

    try {
        const tree = await Tree.findOne({ UID: treeUID, owner: userID });

        if (!tree) { return next(new ErrorHandelar("Tree Not Found", 404)) }

        // Find the index of the link object with the specified _id
        const linkIndex = tree.treeContent.links.findIndex(link => link.UID === linkUID);

        if (linkIndex === -1) { return next(new ErrorHandelar("Link Not Found", 404)) }

        // Remove the link object from the links array
        tree.treeContent.links.splice(linkIndex, 1);

        await tree.save();

        res.json({ success: true, links: tree.treeContent.links });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

export const updateLinksOrder = async (req, res, next) => {
    const userID = req.user._id;

    let treeUID;
    if (!(req.params.treeUID) && !(req.body.treeUID)) {
        return next(new ErrorHandelar("treeUID not provided"));
    } else {
        treeUID = req.body.treeUID || req.params.treeUID;
    }

    let linksUIDArray = req.body.linksUIDArray;
    if (!linksUIDArray) {
        return next(new ErrorHandelar("linksUIDArray not provided"));
    }

    try {
        const tree = await Tree.findOne({ UID: treeUID, owner: userID });

        if (!tree) {
            return next(new ErrorHandelar("Tree Not Found", 404));
        }

        // Map through the linksUIDArray to update the order of links in treeContent.links
        tree.treeContent.links = linksUIDArray.map((linkUID) => {
            // Find the link object in the existing links array by its UID
            const link = tree.treeContent.links.find(link => link.UID === linkUID);
            // Return the link object if found, or null otherwise

            if (!link) { console.log("didn't found a link with the uid ", linkUID) }
            return link || null;
        }).filter(link => link !== null); // Filter out any null entries

        // Save the updated tree to the database
        await tree.save();

        // Send the updated links back in the response
        res.json({ success: true, links: tree.treeContent.links });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

export const editTreeLinkTitleAndURL = async (req, res, next) => {
    const userID = req.user._id;

    let {URL, title, linkUID} = req.body;
    if(!(URL) || !(title)){ return next(new ErrorHandelar("URL or title not provided, nothing to change"));}
    if(!linkUID){return next(new ErrorHandelar("linkUID not provided"));}

    let treeUID;
    if (!(req.params.treeUID) && !(req.body.treeUID)) {
        return next(new ErrorHandelar("treeUID not provided"));
    } else {
        treeUID = req.body.treeUID || req.params.treeUID;
    }
    console.log(URL, title, linkUID, treeUID)
    try {
        // Find the tree belonging to the user
        const tree = await Tree.findOne({ UID: treeUID, owner: userID });

        if (!tree) {
            return next(new ErrorHandelar("Tree Not Found", 404));
        }

        // Find the link within the tree
        let link = tree.treeContent.links.find(link => link.UID === linkUID);
        if (!link) {return next(new ErrorHandelar("Link Not Found", 404));}

        // Update the link's properties if provided
        if (URL) {
            link.URL = URL;
        }
        if (title) {
            link.title = title;
        }

        // Save the updated tree to the database
        await tree.save();

        // Send the updated link back in the response
        res.json({ success: true, link: link });
    } catch (error) {
        console.log(error);
        next(error);
    }
}