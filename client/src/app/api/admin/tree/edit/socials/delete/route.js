import { auth } from "@/auth";
import { connectToDB } from "@/lib/DB/connectDB";
import { Tree } from "@/lib/DB/models/tree";
import { NextResponse } from "next/server";

export const POST = async (req, {params}) => {
    const session = await auth()
    const userID = session.user.id;
    let { socialUID, treeUID } = await req.json();
    if (!socialUID) { return NextResponse.json({success: false, message: "Didn't got linkUID in body" }, {status: 400}) }
    if (!treeUID) {  return NextResponse.json({success: false, message: "Didn't got treeUID in body" }, {status: 400}) } 

    try {
        await connectToDB()
        const tree = await Tree.findOne({ UID: treeUID, owner: userID });

        if (!tree) { return NextResponse.json({success: false, message: "Tree Not Found" }, {status: 404})  }

        // Find the index of the link object with the specified _id
        const socialIndex = tree.treeContent.socials.findIndex(social => social.UID === socialUID);

        if (socialIndex === -1) {  return NextResponse.json({success: false, message: "social Not Found" }, {status: 404})  }

        // Remove the link object from the links array
        tree.treeContent.socials.splice(socialIndex, 1);

        await tree.save();

        return NextResponse.json({ success: true, socials: tree.treeContent.socials });
    } catch (error) {
        console.log(error);
        return NextResponse.json({success: false, message: error.message}, {status: 500}) 
    }
}