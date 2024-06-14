import styles from "./style.module.css"
import GoogleButton from "@/components/buttons/google/googleButton"

export default async function Page() {


  return (
    <div className={styles.container}>
    <GoogleButton/>
    </div>
  )
}
