import { connectToDB } from "@/lib/DB/connectDB";
import { Tree } from "@/lib/DB/models/tree";
import { User } from "@/lib/DB/models/user";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    let { email, name, username, password } = await req.json();
    console.log(email, name, username, password);
    let user;
    if (!password) {
        throw new Error("Password is not provided")
    } else if (!email) {
        throw new Error("Email is not provided")
    } else if (!username) {
        throw new Error("Username is not provided")
    }

    try {
        connectToDB()
        username = username.toLowerCase();
        email = email.toLowerCase();
        let emailUser = await User.findOne({ email });
        let usernameUser = await User.findOne({ username });
        if (emailUser) {
            throw new Error(`Email already used to regester by someone with ${emailUser.authMethod}`)
        } else if (usernameUser) {
            throw new Error(`Username already used to regester by someone with ${usernameUser.authMethod}`)
        }


        // let profilePic;
        // let path = 'http://res.cloudinary.com/kakashib2k/image/upload/v1713685024/uiccf1wbzyioazqgve5q.png';
        // if (req.file) {
        //     path = req.file.path;
        //     const uploadToCloudinaryResult = await uploadToCloudinary(path);
        //     if (uploadToCloudinaryResult && uploadToCloudinaryResult.public_id && uploadToCloudinaryResult.url) {
        //         profilePic = {
        //             public_id: uploadToCloudinaryResult.public_id,
        //             URL: uploadToCloudinaryResult.url
        //         };
        //     } else {
        //         profilePic = {
        //             public_id: 'uiccf1wbzyioazqgve5q',
        //             URL: 'http://res.cloudinary.com/kakashib2k/image/upload/v1713685024/uiccf1wbzyioazqgve5q.png'
        //         };
        //     }
        // } else {
        //     profilePic = {
        //         public_id: 'uiccf1wbzyioazqgve5q',
        //         URL: 'http://res.cloudinary.com/kakashib2k/image/upload/v1713685024/uiccf1wbzyioazqgve5q.png'
        //     };
        // }


        user = await User.create({ name, username, email, password, authMethod: 'email' });
        let tree = await Tree.create({ owner: user._id, treeName: `@${user.name}` });
        await User.findByIdAndUpdate(user._id, { $set: { 'trees.profileDefaultTree': tree._id } });
        console.log({
            sucess: true,
            message: "User created sucessfuully",
            user
        });
        return NextResponse.json({
            sucess: true,
            message: "User created sucessfuully",
            user
        });

    } catch (error) {
        throw new Error(error)
    }
}