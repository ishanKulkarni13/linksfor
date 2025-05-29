'use client'
import { useState } from 'react';
import styles from './style.module.css'
import SelectTreePopup, { SelectTreeContent } from "@/components/selectTree/selectTreePopup/selectTreeContent";

export default function Page() {
  const [open, setOpen] = useState(true)
  return (
    <div className={styles.container}>
      {/* <SelectTreePopup open={open} setOpen={setOpen} /> */}
      <h1 className={styles.title}>Select Tree</h1>
      <p className={styles.description}>
        Select a tree to manage its links and settings.
      </p>
      <SelectTreeContent open={open} setOpen={setOpen} />
    </div>
  )
}
