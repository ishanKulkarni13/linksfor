import { auth } from "@/auth";
import { Tree } from "@/lib/DB/models/tree";
import { NextResponse } from "next/server";

export const POST = async (req, {params}) => {
    let { URL, title } = await req.json();
    if(!URL || !title){  return NextResponse.json({ success: false, message: "the required fields are not provided" }, {status:500}) }
    let treeUID =  params.treeUID
    let updatedLinkObject = { type: "link", title, URL };
    
    
    try {
        const session = await auth();
        const userID = session.user.id;
        // let isTreeOfUser = await Tree
        let UpdatedTree = await Tree.findOneAndUpdate({ UID: treeUID, owner: userID }, { $push: { 'treeContent.links': { $each: [updatedLinkObject], $position: 0 } } }, { new: true });
        if (!UpdatedTree) { return next(new ErrorHandelar('Tree not found')) }
        console.log(UpdatedTree.treeContent.links);
        return NextResponse.json({ success: true, links: UpdatedTree.treeContent.links })

    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: error.message }, {status:500})
    }
}