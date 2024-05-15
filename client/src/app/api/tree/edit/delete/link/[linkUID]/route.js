import { auth } from "@/auth";
import { Tree } from "@/lib/DB/models/tree";
import { NextResponse } from "next/server";

export const POST = async (req, {params}) => {
    const session = await auth()
    const userID = session.user.id;
    let { linkUID, treeUID } = await req.json();
    if (!linkUID) { return NextResponse.json({success: false, message: "Didn't got linkUID in body" }, {status: 400}) }
    if (!treeUID) {  return NextResponse.json({success: false, message: "Didn't got treeUID in body" }, {status: 400}) } 

    try {
        const tree = await Tree.findOne({ UID: treeUID, owner: userID });

        if (!tree) { return NextResponse.json({success: false, message: "Tree Not Found" }, {status: 404})  }

        // Find the index of the link object with the specified _id
        const linkIndex = tree.treeContent.links.findIndex(link => link.UID === linkUID);

        if (linkIndex === -1) {  return NextResponse.json({success: false, message: "Link Not Found" }, {status: 404})  }

        // Remove the link object from the links array
        tree.treeContent.links.splice(linkIndex, 1);

        await tree.save();

        return NextResponse.json({ success: true, links: tree.treeContent.links });
    } catch (error) {
        console.log(error);
        return NextResponse.json({success: false, message: error.message}, {status: 500}) 
    }
}