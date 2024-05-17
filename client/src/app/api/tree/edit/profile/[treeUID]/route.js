import { auth } from "@/auth";
import { Tree } from "@/lib/DB/models/tree";
import { NextResponse } from "next/server";

export const POST = async (req, { params }) => {
    const { treeUID } = params;
    if (!treeUID) {
        return NextResponse.json({ success: false, message: "treeUID not provided"}, { status: 500 })
    } 
    
    
    try {
        let { treeName, treeBio } = await req.json();
        if (!treeName && !treeBio) {
            return NextResponse.json({success: false, message: "Nothing to change" },{status: 500})
        }
        const session = await auth()
        const userID = session.user.id
        
        let tree = await Tree.findOne({ UID: treeUID });
        if (!tree) {
            return NextResponse.json({ success: false, message: 'treeUID is not valid'}, { status: 400 })
        };
        
        if (tree.owner.equals(userID)) {
            
            if (treeName) {
                tree.treeName = treeName
            }
            
            if (treeBio) {
                tree.treeBio = treeBio
            }
            await tree.save();
            
            return NextResponse.json({success: true, treeProfile: { treeBio, treeName } })
        } else {
            return NextResponse.json({success: false, message: "Unautherised access to edit tree"},{status: 401})
        }
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({success: false, message: error.message },{status: 500})
    }
}