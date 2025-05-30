import { auth } from "@/auth";
import { connectToDB } from "@/lib/DB/connectDB";
import { Tree } from "@/lib/DB/models/tree";
import { NextResponse } from "next/server";

export const POST = async (req, { params }) => {
    let { URL, title, thumbnailURL, layout, linkUID , treeUID} = await req.json();
    if (!linkUID) {
        return NextResponse.json({ success: false, message: "linkUID not provided" }, { status: 400 })
    }
    if (!treeUID) {
        return NextResponse.json({ success: false, message: "treeUID not provided" }, { status: 400 })
    }
    try {
        await connectToDB()
        const session = await  auth();
        const userID = session.user.id
        // Find the tree belonging to the user
        const tree = await Tree.findOne({ UID: treeUID, owner: userID });
        if (!tree) {
            return NextResponse.json({ success: false, message: "Tree Not Found"  }, { status: 404 })
        }
        // Find the link within the tree
        let link = tree.treeContent.links.find(link => link.UID === linkUID);
        if (!link) {
            return NextResponse.json({success: false, message: "link not updated, Link Not Found" } , {status:404})
        }
        // Update the link's properties if provided
        if (typeof URL === "string") {
            link.URL = URL;
        }
        if (typeof title === "string") {
            link.title = title;
        }
        // Fix: allow empty string to remove thumbnail
        if (typeof thumbnailURL === "string") {
            link.thumbnail.URL = thumbnailURL;
        }
        if (typeof layout === "string") {
            link.layout = layout;
        }
        // Save the updated tree to the database
        await tree.save();
        // Send the updated link back in the response
        return NextResponse.json({success: true, link: link}, {status: 200})
    } catch (error) {
        console.log(error);
        return NextResponse.json({success: false, message: error.message}, {status:500})
    }
}