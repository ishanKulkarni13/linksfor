'use client'
import { useState } from 'react';
import styles from './style.module.css'
import SelectTreePopup from "@/components/selectTree/selectTreePopup/selectTreePopup";

export default function Page() {
  const [open, setOpen] = useState(true)
  return (
    <div className={styles.container}>
      <SelectTreePopup open={open} setOpen={setOpen} />
    </div>
  )
}
