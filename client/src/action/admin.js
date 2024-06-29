"use server";

import { auth } from "@/auth";
import { connectToDB } from "@/lib/DB/connectDB";
import { User } from "@/lib/DB/models/user";
import { revalidatePath } from "next/cache";

export async function changeAdminAccountInfo(data) {
  
    try {
      let { name, username } = data;
  
      await connectToDB();
      const session = await auth();
      if (!(session && session.user))
        return { success: false, message: "Login first" };
  
      const userID = session.user.id;
  
      const user = await User.findById(userID);
  
      if (!user) {
        return { success: false, message: "User not found" };
      }
  
      if (name) user.name = name;
      if (username) user.username = username;
  
      await user.save();
   
      let responseUser = { username: user.username, name: user.name, email:user.email };
  
      revalidatePath("/admin/account");
      return { success: true, user: responseUser };
    } catch (error) {
      console.log(error);
      return { success: false, message: error.message };
    }
  }
  