'use client'

import { useEffect } from "react";

export default function GoogleLogin() {

    useEffect( ()=>{
       async function login(){
       try {
        
        window.open("http://localhost:4000/auth/google", "_self")
       } catch (error) {
        console.log(error)
       }
       };
       login();
    }, [])
  return (
    <main className="flex js" >
      <h1>You will be redirected to the google OAuth Page soon</h1>
    </main>
  );
}
