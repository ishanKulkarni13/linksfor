import { auth } from "@/auth";
import React from "react";
import styles from "./home.module.css";
import Link from "next/link";

export default async function page() {
  const session = await auth();
  const user = session?.user;

  return (
    <main className={`${styles.main}`}>
      <div className={`${styles.homeContainer}`}>
        <div className={`${styles.topContainer}`}>
          <h1>A Link-in-bio for your social profiles</h1>
          <p>Wide varity of themes, fast and totally free</p>
        </div>
        {!user ? (
          <>
            <div className={`${styles.getStartedContainer}`}>
              <Link
                className={`${styles.getStarted}`}
                href={`/login`}
              >
                Get started{" "}
              </Link>
              <Link
                className={`${styles.login}`}
                href={`/login`}
              >
                Login{" "}
              </Link>
            </div>
          </>
        ) : (
          <>
            <Link
              className={`${styles.adminConsole}`}
              href={`/admin/tree/edit/appearance`}
            >
              Admin Console{" "}
            </Link>
          </>
        )}
      </div>
    </main>
  );
}
