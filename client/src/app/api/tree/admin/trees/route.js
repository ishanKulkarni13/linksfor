import { auth } from "@/auth"
import { connectToDB } from "@/lib/DB/connectDB"
import { Tree } from "@/lib/DB/models/tree"
import { NextResponse } from "next/server"

export const GET = async () => {

    await new Promise(resolve => setTimeout(resolve, 5000));

    try {
        await connectToDB()
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ success: false, message: 'user not logedin' }, { status: 500 })
        };
        let userID = session.user.id


        let trees = await Tree.find({ owner: userID });
        if (trees.length === 0) {
            return NextResponse.json({ success: false, message: 'Tree(s) not found' }, { status: 404 })
        };
        return NextResponse.json({ success: true, trees })
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 })
    }

}