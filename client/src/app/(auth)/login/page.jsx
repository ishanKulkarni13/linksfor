import { googleLogin } from "@/action/login"
import { signIn } from "@/auth"

export default async function Page() {


  return (
    <div>
     <form action={googleLogin}>
      <button type="submit">Login</button>
     </form>
    </div>
  )
}
