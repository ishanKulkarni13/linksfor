import { auth } from "@/auth";
import { connectToDB } from "@/lib/DB/connectDB";
import { User } from "@/lib/DB/models/user";
import { NextResponse } from "next/server";

export const GET = async () => {

    try {
        await connectToDB()
        const session = await auth()
        if (!(session && session.user)) return NextResponse.json({ success: false, message: 'Login first' }, { status: 500 });

        const userID = session.user.id;

        const user = await User.findById(userID)

        if (!user) {
            return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
        }

        let responseUser = {
            name: user.name,
            username: user.username,
            publicUID: user.publicUID,
            profilePic: user.profilePic,
            email: user.email,
            bio: user.bio,
        };

        return NextResponse.json({ success: true, user: responseUser });


    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 })
    }

}