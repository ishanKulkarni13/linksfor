import { auth } from "@/auth";
import { Tree } from "@/lib/DB/models/tree";
import { User } from "@/lib/DB/models/user";
import { NextResponse } from "next/server";

export const GET = async ()=>{
    const session  = await auth();
    let userID = session.user.id;

    try {
        let user = await User.findById(userID).select("trees")
        console.log(user);
        let tree = await Tree.findById(user.trees.profileDefaultTree)
        if (!tree) {
            return NextResponse.json({ sucess: false, message:"tree not found" }, {status:404})
        }
        console.log(`sent treeUID`, tree.UID);
        return NextResponse.json({ sucess: true, treeUID: tree.UID })
    } catch (error) {
        return NextResponse.json({ sucess: false, message:error.message }, {status:500})
    }
}