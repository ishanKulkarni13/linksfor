import { auth } from "@/auth";
import React from "react";
import styles from "./home.module.css";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await auth();
  const user = session?.user;

  return (
    <main className={`${styles.main}`}>
      <div className={`${styles.homeContainer}`}>
        <div className={`${styles.topContainer}`}>
          <h1>A Link-in-bio for you social profiles</h1>
          <p>Wide varity of themes (soon), fast and totally free</p>
        </div>
        {!user ? (
          <>
            <div className={`${styles.getStartedContainer}`}>
              <Link
                className={`${styles.getStarted}`}
                href={`/api/auth/signin`}
              >
                Get started{" "}
              </Link>
              <Link
                className={`${styles.login}`}
                href={`/api/auth/signin`}
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
