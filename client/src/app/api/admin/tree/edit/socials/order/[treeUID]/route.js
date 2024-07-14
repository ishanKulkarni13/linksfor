import { auth } from "@/auth";
import { Tree } from "@/lib/DB/models/tree";
import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/DB/connectDB";
export const POST = async (req,{params}) => {
 
    try {
        const session = await auth()
        const userID = session.user.id;
        let {treeUID} = params
        if (!treeUID) {
            return NextResponse.json({ sucess: false, message:"treeUID not provided"}, {status:500})
        } 
    
        let {socialsUIDArray} = await req.json();
        if (!socialsUIDArray) {
            return NextResponse.json({ sucess: false, message:"socialsUIDArray not provided"}, {status:500})
        }

        await connectToDB()
        const tree = await Tree.findOne({ UID: treeUID, owner: userID });

        if (!tree) {
            return NextResponse.json({ sucess: false, message:"Tree Not Found"}, {status:404})
        }

        // Map through the sicialsUIDArray to update the order of socials in treeContent.socials
        tree.treeContent.socials = socialsUIDArray.map((socialUID) => {
            // Find the social object in the existing socials array by its UID
            const social = tree.treeContent.socials.find(social => social.UID === socialUID);
            // Return the social object if found, or null otherwise
            if (!social) { console.log("didn't found a social with the uid ", socialUID) }
            return social || null;
        }).filter(social => social !== null);

        await tree.save();

        return NextResponse.json({ success: true, social: tree.treeContent.socials });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ sucess: false, message:error.message }, {status:500})
    }
}