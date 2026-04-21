"use client";
import React from "react";
import styles from "./home.module.css";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton";

export default function HomeAuthLinks() {
  const { status } = useSession();

    // if (status == "loading" || true) return <Skeleton className={styles.homeAuthLinksSkeleton} />;
  if (status == "authenticated") {
    return (
      <Link className={styles.adminConsole} href="/admin/tree/edit/appearance">
        Admin Console
      </Link>
    );
  } else 
    return (
      <div className={styles.heroActions}>
        <Link className={styles.getStarted} href="/login">
          Get started
        </Link>
        <Link className={styles.login} href="/login">
          Login
        </Link>
      </div>
    );

  return null;
}
