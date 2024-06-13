import { signOut } from "@/auth"
import styles from "./style.module.css"
import Link from "next/link"


export default async function Page() {

  return (
    <div className={styles.container}>
      <h1>Are you sure you want to signout?</h1>
      <form action={async ()=>{
        "use server"
        const res = await signOut({callbackUrl: '/', redirect:true});
        console.log(res);
      }}>
        <div >
        <button type="submit">Sign out</button>
        <Link href={'/admin/more'} > Cancel</Link>
        </div>
      </form>
    </div>
  )
}
