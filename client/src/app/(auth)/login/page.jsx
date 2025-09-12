import styles from "./style.module.css";
import GoogleButton from "@/components/buttons/google/googleButton";
import Link from "next/link";
import Head from "next/head";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Page() {
  return (
    <>
      <Head>
        <title>Login | linksfor</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.loginBox}>
          <div className={styles.logoArea}>
            {/* <span className={styles.brandName}>linksfor</span> */}
            <FontAwesomeIcon className={styles.logo} icon={faLink} />
          </div>
          <h1 className={styles.title}>Sign up/Sign in to Your Account</h1>
          <p className={styles.subtitle}>
            Access your dashboard and manage your trees.
            <br />
            One link for all your socials, portfolio, and more.
          </p>
          {/* Divider */}
          <div className={styles.divider}>
            <span className={styles.dividerText}>Continue with</span>
          </div>
          {/* Google Button */}
          <GoogleButton />
          {/* Footer */}
          <div className={styles.footer}>
            <span>
              By signing up, you agree to our{" "}
              <Link href="/terms" className={styles.link}>
                Terms
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className={styles.link}>
                Privacy Policy
              </Link>
              .
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
