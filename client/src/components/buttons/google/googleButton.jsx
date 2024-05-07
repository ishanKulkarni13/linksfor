'user client'
import { useRouter } from "next/navigation";
import styles from './googleButton.module.css'
function GoogleButton() {
  const {push} = useRouter()

  return (
    <div onClick={()=> push('/auth/google')} className={`${styles.container}`}>
      <p>Google</p>
    </div>
  )
}

export default GoogleButton
