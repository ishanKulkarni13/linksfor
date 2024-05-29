import { connectToDB } from "@/lib/DB/connectDB";
import { Tree } from "@/lib/DB/models/tree";
import { User } from "@/lib/DB/models/user";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
    const { treeUID } = params;
    let shareableLink;
    let isTreeOwnerDefaultTree
    try {
        await connectToDB()
        let tree = await Tree.findOne({ UID: treeUID }).select('owner');
        if (!tree) {
            return NextResponse.json({ success: false, message: 'Invalid treeUID' }, { status: 401 })
        };

        let owner = await User.findById(tree.owner)
        if (!owner) {
            return NextResponse.json({ success: false, message: "Tree owner not found" }, { status: 404 })
        }

        if (tree._id.equals(owner.trees.profileDefaultTree)) {
            isTreeOwnerDefaultTree = true
        } else {
            isTreeOwnerDefaultTree = false
        }

        if (isTreeOwnerDefaultTree) {
            shareableLink = `${process.env.NEXT_PUBLIC_STATIC_FRONTEND_URL }/${owner.username}`
        } else {
            shareableLink = `${process.env.NEXT_PUBLIC_STATIC_FRONTEND_URL }/tree/${treeUID}`
        }

        return NextResponse.json({ success: true, shareableLink, isTreeOwnerDefaultTree })

    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 })
    }
}