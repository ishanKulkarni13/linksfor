import { auth } from "@/auth";
import { connectToDB } from "@/lib/DB/connectDB";
import { Tree } from "@/lib/DB/models/tree";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
    let { treeUID } = params;

    // if (req.params.treeUID) {
    //     treeUID = req.params.treeUID
    //     console.log(req.params);
    // } else {
    //     return NextResponse.json({success: false, message:}, {status: 500})
    //     return next(new ErrorHandelar("treeUID not provided in params"))
    // }

    if (!treeUID) {
        return NextResponse.json({ success: false, message: "treeUID not provided in params" }, { status: 500 })
    }

    try {
        await connectToDB()
        const session = await auth()
        let userID = session.user.id 
        let tree = await Tree.findOne({ UID: treeUID });
        if (!tree) {
            return NextResponse.json({ success: false, message: 'Invalid treeUID' }, { status: 400 })
        };
        
        if (tree.owner.equals(userID)) {
            const { UID,treeProfileLayout, treeVisibility, treeLockConfig, treeName, treePicture, treeBio, theme } = tree;
            
            return NextResponse.json({ success: true,  treeProfile: { UID, treeVisibility,treeProfileLayout,  treeLockConfig, treeName, treePicture, treeBio, theme : {selectedTheme: theme.selectedTheme} } })
        } else {
            return NextResponse.json({ success: false, message: "Unautherised access to edit tree"}, { status: 401 })
        }
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message}, { status: 500 })
    }
    
}