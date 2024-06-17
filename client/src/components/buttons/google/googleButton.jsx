import { googleLogin } from "@/action/login";
import styles from "./googleButton.module.css";
import { FaGoogle } from "react-icons/fa6";
function GoogleButton() {
  return (
    <form className={`${styles.container}`} action={googleLogin}>
      <button type="submit">
        <span>Login With Gogle</span>{" "}
        <div>
          <FaGoogle className={`${styles.icon}`} />
        </div>
      </button>
    </form>
  );
}

export default GoogleButton;
