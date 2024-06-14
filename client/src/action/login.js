'use server'
import { signIn } from "@/auth"

export const googleLogin = async ()=>{
   await  signIn('google',{redirectTo:'/admin/tree/edit/links', redirect: true})
}