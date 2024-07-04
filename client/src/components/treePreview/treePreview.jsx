'use client'
import styles from "./treePreview.module.css"
import { useTreeUID } from "@/hooks/treeUID"

export default function TreePreview({refresh, treeUID, showBorder}) {
  if(!treeUID)  treeUID = useTreeUID();
  return (
    // <div className={styles.container} >
      <div className={styles.preview} >
        <iframe className={`${styles.iframe} ${showBorder && styles.showBorder}`}   src={`/tree/${treeUID}`} title="tree Preview" scrolling="yes" ></iframe>
      </div>
    // </div>
  )
}
