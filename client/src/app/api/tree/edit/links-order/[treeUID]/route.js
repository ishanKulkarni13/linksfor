import { auth } from "@/auth";
import { Tree } from "@/lib/DB/models/tree";
import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/DB/connectDB";
export const POST = async (req,{params}) => {
    const session = await auth()
    const userID = session.user.id;
    let {treeUID} = params
    if (!treeUID) {
        return NextResponse.json({ sucess: false, message:"treeUID not provided"}, {status:500})
    } 

    let {linksUIDArray} = await req.json();
    if (!linksUIDArray) {
        return NextResponse.json({ sucess: false, message:"linksUIDArray not provided"}, {status:500})
    }

    try {
        await connectToDB()
        const tree = await Tree.findOne({ UID: treeUID, owner: userID });

        if (!tree) {
            return NextResponse.json({ sucess: false, message:"Tree Not Found"}, {status:404})
        }

        // Map through the linksUIDArray to update the order of links in treeContent.links
        tree.treeContent.links = linksUIDArray.map((linkUID) => {
            // Find the link object in the existing links array by its UID
            const link = tree.treeContent.links.find(link => link.UID === linkUID);
            // Return the link object if found, or null otherwise
            if (!link) { console.log("didn't found a link with the uid ", linkUID) }
            return link || null;
        }).filter(link => link !== null);

        await tree.save();

        return NextResponse.json({ success: true, links: tree.treeContent.links });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ sucess: false, message:error.message }, {status:500})
    }
}