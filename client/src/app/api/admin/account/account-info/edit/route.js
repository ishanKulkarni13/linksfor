import { auth } from "@/auth";
import { connectToDB } from "@/lib/DB/connectDB";
import { User } from "@/lib/DB/models/user";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export const POST = async (req) => {

    try {
        let { name, username, profilePicturePublicUrl, } = await req.json();

        await connectToDB()
        const session = await auth()
        if (!(session && session.user)) return NextResponse.json({ success: false, message: 'Login first' }, { status: 500 });

        const userID = session.user.id;

        const user = await User.findById(userID)

        if (!user) {
            return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
        }

        if (name) user.name = name;
        if (username) user.username = username;
        if (profilePicturePublicUrl) user.profilePic.URL = profilePicturePublicUrl;

        await user.save()

        let responseUser = { username: user.username, name: user.name, profilePicturePublicUrl: user.profilePic.URL }


        revalidatePath('/admin/account');
        return NextResponse.json({ success: true, user: responseUser });


    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 })
    }

}