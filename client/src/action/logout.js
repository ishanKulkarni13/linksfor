"use server"
import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";


export const logout = async ()=>{

    const session = await auth()
    const user = session?.user;
    if(user){
        await signOut({redirectTo:'/', redirect: true});
    }
    redirect('/');
}