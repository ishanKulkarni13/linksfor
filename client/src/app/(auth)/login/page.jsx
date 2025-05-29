import styles from "./style.module.css";
import GoogleButton from "@/components/buttons/google/googleButton";

export default function Page() {
  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h1 className={styles.title}>Sign in to Your Account</h1>
        <p className={styles.subtitle}>Access your dashboard and manage your trees</p>
        <GoogleButton />
      </div>
    </div>
  );
}
