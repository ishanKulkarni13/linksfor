import { connectToDB } from "@/lib/DB/connectDB";
import { Tree } from "@/lib/DB/models/tree";
import { User } from "@/lib/DB/models/user";
import { NextResponse } from "next/server";

export const GET = async (req,{params}) => {
    try {
        let {username} = params;
        if (!username) {
            return NextResponse.json({success: false, message : "Username not provided"}, {status: 500} )
        }
        username = username.toLowerCase()
        await connectToDB()
        // Find the user by username and select verified and trees fields
        console.log(username);
        const user = await User.findOne({ username: { $regex: new RegExp(`^${username}$`, "i") } }).select('verified trees _id');
        if (!user) {
            return NextResponse.json({success: false, message : "User not found"}, {status: 404} )
        }
        console.log('got user', user);
        // const treeID = user.trees.ProfileDefaultTree;
        // console.log(treeID);
        // Find the tree whose owner is the user
        // const tree = await Tree.findOne({owner: user._id})
        const tree = await Tree.findById(user.trees.profileDefaultTree); //change
        if (!tree) {
            return NextResponse.json({success: false, message : "Tree not found"}, {status: 404} )
        }
        // Check if the tree visibility is public
        if (tree.treeVisibility !== "public") {
            return NextResponse.json({success: false, message :`The tree is not public, it's locked with ${tree.treeVisibility}` , lockedWith: tree.treeVisibility }, {status: 403} )
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
        
        return NextResponse.json({success: true, tree: responseTree } )
    } catch (error) {
        console.log(error);
        return NextResponse.json({success: false, message : error.message}, {status: 500} )
    }
};