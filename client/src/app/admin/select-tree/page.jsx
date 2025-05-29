"use client";
import styles from "./style.module.css";
import { Suspense, useState } from "react";
import  { SelectTreeContent } from "@/components/selectTree/selectTreePopup/selectTreeContent";

export default function Page() {
  const [open, setOpen] = useState(true);
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Select Tree</h1>
      <p className={styles.description}>
        Select a tree to manage its links and settings.
      </p>
      <Suspense fallback={null}>
        <SelectTreeContent open={open} setOpen={setOpen} />
      </Suspense>
    </div>
  );
}