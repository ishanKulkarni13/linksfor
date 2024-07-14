import { auth } from "@/auth";
import { connectToDB } from "@/lib/DB/connectDB";
import { Tree } from "@/lib/DB/models/tree";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    let { URL, icon, treeUID } = await req.json();
    if(!URL || !icon || !treeUID){  return NextResponse.json({ success: false, message: "the required fields are not provided" }, {status:500}) }
    
    let social = {  URL, icon };
    
    
    try {
        const session = await auth();
        const userID = session.user.id;
        await connectToDB()       

        let UpdatedTree = await Tree.findOneAndUpdate({ UID: treeUID, owner: userID }, { $push: { 'treeContent.socials': { $each: [social], $position: 0 } } }, { new: true });
        if (!UpdatedTree) { return next(new ErrorHandelar('Tree not found')) }
        console.log( UpdatedTree.treeContent.socials);
        return NextResponse.json({ success: true, socials: UpdatedTree.treeContent.socials })

    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: error.message }, {status:500})
    }
}