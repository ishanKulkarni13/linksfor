import { auth } from "@/auth";
import { connectToDB } from "@/lib/DB/connectDB";
import { Tree } from "@/lib/DB/models/tree";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
    const session = await auth();
    const userID = session.user.id;
    const { treeUID } = params;
    try {
        await connectToDB()
        // let tree = await Tree.findOne({ UID: treeUID, owner: user._id });
        let tree = await Tree.findOne({ UID: treeUID });
        if (!tree) { return NextResponse.json({ success: false, message: 'Invalid treeUID'}, {status: 401})};

        if (tree.owner.equals(userID)) {
            return NextResponse.json({ success: true, links: tree.treeContent.links })
        } else {
            return NextResponse.json({ success: false, message: "Unautherised access to edit tree"}, {status: 401})
        }

    } catch (error) {
        console.log(error);
        throw new Error(error.message)
    }
}