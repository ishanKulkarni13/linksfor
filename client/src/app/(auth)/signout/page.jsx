
import styles from "./style.module.css"
import Link from "next/link"
import { logout } from "@/action/logout"


export default async function Page() {

  return (
    <div className={styles.container}>
      <h1>Are you sure you want to signout?</h1>
      <form action={logout}>
        <div >
        <button type="submit">Sign out</button>
        <Link href={'/admin/more'} > Cancel</Link>
        </div>
      </form>
    </div>
  )
}
