import { auth } from "@/auth";
import { Tree } from "@/lib/DB/models/tree";
import { NextResponse } from "next/server";

export const POST = async (req, { params }) => {
    const { treeUID } = params;
    if (!treeUID) {
        return NextResponse.json({ success: false, message: "treeUID not provided"}, { status: 400 })
    } 
    
    
    try {
        let { treeName, treeBio, profilePicturePublicUrl, selectedThemeID, treeProfileLayout } = await req.json();

        const hasProfilePictureUpdate = typeof profilePicturePublicUrl === "string";
        if (!treeName && !treeBio && !hasProfilePictureUpdate && !selectedThemeID && !treeProfileLayout) {
            return NextResponse.json({success: false, message: "Nothing to change" },{status: 400})
        }
        const session = await auth()
        const userID = session.user.id
        
        let tree = await Tree.findOne({ UID: treeUID });
        if (!tree) {
            return NextResponse.json({ success: false, message: 'Tree not found'}, { status: 404 })
        };
        
        if (tree.owner.equals(userID)) {
            
            if (typeof treeName === "string") {
                tree.treeName = treeName
            }
            
            if (typeof treeBio === "string") {
                tree.treeBio = treeBio
            }

            if (hasProfilePictureUpdate) {
                tree.treePicture.URL = profilePicturePublicUrl;
            }

            if(typeof selectedThemeID === "number"){
                tree.theme.selectedTheme.themeID = selectedThemeID
            }

            if(typeof treeProfileLayout === "string"){
                tree.treeProfileLayout  = treeProfileLayout;
            }

            await tree.save();
            return NextResponse.json({success: true, treeProfile: { treeBio: tree.treeBio, treeName: tree.treeName , profilePicturePublicUrl: tree.treePicture.URL,  } }, {status: 200})
        } else {
            return NextResponse.json({success: false, treeBio: tree.treeBio, treeName: tree.treeName, message: "Unautherised access to edit tree"},{status: 401})
        }
        
    } catch (error) {
        console.log(error);
        if (error.name === 'ValidationError') {
            return NextResponse.json({success: false, message: error.message },{status: 400})
        }
        
        return NextResponse.json({success: false,  message: error.message },{status: 500})
    }
}