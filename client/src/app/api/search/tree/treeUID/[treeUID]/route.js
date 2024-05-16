import { connectToDB } from "@/lib/DB/connectDB";
import { Tree } from "@/lib/DB/models/tree";
import { NextResponse } from "next/server";

export const GET = async(req, {params}) => {
    let {treeUID} = params;

    if (!treeUID) {
        return NextResponse.json({success: false, message:"treeUID not provided"},{status:500})
    } 

    try {
        await connectToDB();
        treeUID = treeUID.toLowerCase()
        const tree = await Tree.findOne({ UID : treeUID });
        if (!tree) {
            return NextResponse.json({success: false, message:"Tree not found"},{status:500})
        }
        // Check if the tree visibility is public
        if (tree.treeVisibility !== "public") {
            return NextResponse.json({success: false, message:`The tree is not public, it's locked with ${tree.treeVisibility}`, lockedWith: tree.treeVisibility},{status:403})
        }

        // Prepare the response tree
        let responseTree = {
            // verified: user.verified,
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
        return NextResponse.json({success: true, tree: responseTree})
    } catch (error) {
        console.log(error);
        return NextResponse.json({success: false, message:error.message },{status:500})
    }
};