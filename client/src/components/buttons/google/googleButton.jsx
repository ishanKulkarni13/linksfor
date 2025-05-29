"use client";
import { googleLogin } from "@/action/login";
import styles from "./googleButton.module.css";
import { FaGoogle } from "react-icons/fa6";
import { useState } from "react";

function GoogleButton() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    setLoading(true);
    // Let the form submit normally to the server action
  };

  return (
    <form
      className={styles.container}
      action={googleLogin}
      onSubmit={handleSubmit}
    >
      <button type="submit" disabled={loading}>
        {loading ? (
          <>
            <span className={styles.spinner}></span>
            <span>Redirecting...</span>
          </>
        ) : (
          <>
            <span>Login With Google</span>
            <div>
              <FaGoogle className={styles.icon} />
            </div>
          </>
        )}
      </button>
    </form>
  );
}

export default GoogleButton;
