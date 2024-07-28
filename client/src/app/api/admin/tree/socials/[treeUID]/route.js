import { auth } from "@/auth";
import { connectToDB } from "@/lib/DB/connectDB";
import { Tree } from "@/lib/DB/models/tree";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
    const { treeUID } = params;
    try {
        await connectToDB()
        const session = await auth();
        const userID = session.user.id;
        let tree = await Tree.findOne({ UID: treeUID });
        if (!tree) { return NextResponse.json({ success: false, message: 'Invalid treeUID'}, {status: 401})};

        if (!tree.owner.equals(userID)) {
            return NextResponse.json({ success: false, message: "Unautherised access to edit tree"}, {status: 401})
        } 

        return NextResponse.json({ success: true, socials: tree.treeContent.socials  , socialIconsPreference : tree.theme.themePreference?.socialIcons})
        

    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 })
    }
}