import { auth } from "@/auth";
import { connectToDB } from "@/lib/DB/connectDB";
import { Tree } from "@/lib/DB/models/tree";
import { NextResponse } from "next/server";

export const POST = async (req, {params}) => {
    
    try {
        let { URL, title } = await req.json();
        if(!URL && !title){  return NextResponse.json({ success: false, message: "AtlastTitle should be provided to add a header" }, { status: 400 }) }
        let treeUID =  params.treeUID
        let updatedLinkObject = { type: "header", title };
        if (URL) updatedLinkObject.URL = URL;
        const session = await auth();
        const userID = session.user.id;
        await connectToDB()
        // let isTreeOfUser = await Tree
        let UpdatedTree = await Tree.findOneAndUpdate({ UID: treeUID, owner: userID }, { $push: { 'treeContent.links': { $each: [updatedLinkObject], $position: 0 } } }, { new: true });
        if (!UpdatedTree) { return NextResponse.json({ success: false, message: 'Tree not found' }, { status: 404 }) }
        return NextResponse.json({ success: true, links: UpdatedTree.treeContent.links }, { status: 200 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 })
    }
}