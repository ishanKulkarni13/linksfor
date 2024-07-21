import { auth } from "@/auth";
import { connectToDB } from "@/lib/DB/connectDB";
import { Tree } from "@/lib/DB/models/tree";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    let { URL, socialUID , treeUID} = await req.json();
    if (!(URL) ) {
        return NextResponse.json({ success: false, message:  "URL or not provided, nothing to change" }, { status: 500 })
    }
    if (!socialUID) {
        return NextResponse.json({ success: false, message: "socialUID not provided" }, { status: 500 })
        
    }
    if (!treeUID) {
        return NextResponse.json({ success: false, message: "treeUID not provided in body" }, { status: 500 })
    }
    // console.log(URL, title, socialUID, treeUID)
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
        let social = tree.treeContent.socials.find(social => social.UID === socialUID);
        if (!social) {
            return NextResponse.json({success: false, message: "social not updated, social Not Found" } , {status:404})
        }
        
        // Update the link's properties if provided
            social.URL = URL;
               
        // Save the updated tree to the database
        await tree.save();
        
        // Send the updated link back in the response
        return NextResponse.json({success: true, social: social  })
    } catch (error) {
        console.log(error);
        return NextResponse.json({success: false, message: error.message  } , {status:500})
    }
}