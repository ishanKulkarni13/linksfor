import { auth } from "@/auth";
import { connectToDB } from "@/lib/DB/connectDB";
import { Tree } from "@/lib/DB/models/tree";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    let { socialIconsPlacement, treeUID } = await req.json();
    if(!socialIconsPlacement){  return NextResponse.json({ success: false, message: "the required fields are not provided" }, {status:500}) }

    if(!treeUID){  return NextResponse.json({ success: false, message: "treeUID not provided in body" }, {status:500}) }
   
    
    
    try {
        const session = await auth();
        const userID = session.user.id;
        await connectToDB()
        let tree = await Tree.findOne({ UID: treeUID, owner: userID });
        if (!tree) { return NextResponse.json({ success: false, message: 'tree not found' }, {status:500}) }


        console.log('got', socialIconsPlacement);
        tree.theme.themePreference.socialIcons.socialIconsPlacement = socialIconsPlacement;
        await tree.save()

        console.log('from db', tree.theme.themePreference.socialIcons.socialIconsPlacement );

        return NextResponse.json({ success: true })

    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: error.message }, {status:500})
    }
}