import { auth } from "@/auth";
import { connectToDB } from "@/lib/DB/connectDB";
import { User } from "@/lib/DB/models/user";
import { NextResponse } from "next/server";

export const GET = async (req )=>{
    try {
        connectToDB();
        let session = await auth()
        let userID = session.user.id
        console.log("sasasasas", userID);
        return NextResponse.json({success:true})
    } catch (error) {
        console.log(error);
    }
}