import { auth } from "@/auth";
import { Tree } from "@/lib/DB/models/tree";
import { NextResponse } from "next/server";

export const POST = async (req, { params }) => {
    const { treeUID } = params;
    if (!treeUID) {
        return NextResponse.json({ success: false, message: "treeUID not provided"}, { status: 500 })
    } 
    
    
    try {
        let { treeName, treeBio, profilePicturePublicUrl, selectedThemeID, treeProfileLayout } = await req.json();

        

        // Fix: allow empty string for profilePicturePublicUrl
        const hasProfilePictureUpdate = typeof profilePicturePublicUrl === "string";
        if (!treeName && !treeBio && !hasProfilePictureUpdate && !selectedThemeID && !treeProfileLayout) {
            return NextResponse.json({success: false, message: "Nothing to change" },{status: 500})
        }
        const session = await auth()
        const userID = session.user.id
        
        let tree = await Tree.findOne({ UID: treeUID });
        if (!tree) {
            return NextResponse.json({ success: false, message: 'Tree not found'}, { status: 400 })
        };
        
        if (tree.owner.equals(userID)) {
            
            if (treeName) {
                tree.treeName = treeName
            }
            
            if (treeBio) {
                tree.treeBio = treeBio
            }

            // Fix: allow empty string to remove profile picture
            if (hasProfilePictureUpdate) {
                tree.treePicture.URL = profilePicturePublicUrl;
            }

            if(selectedThemeID){
                // validatin cheakes.... 
                tree.theme.selectedTheme.themeID = selectedThemeID
            }

            if(treeProfileLayout){
                tree.treeProfileLayout  = treeProfileLayout;
            }

            await tree.save();
            return NextResponse.json({success: true, treeProfile: { treeBio: tree.treeBio, treeName: tree.treeName , profilePicturePublicUrl: tree.treePicture.URL,  } })
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