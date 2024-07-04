'use client'
import styles from "./treePreview.module.css"
import { useTreeUID } from "@/hooks/treeUID"

export default function TreePreview({refresh, treeUID, showBorder}) {
  const  componentTreeUID = useTreeUID();

  if(!treeUID) treeUID = componentTreeUID;
  
  return (
    // <div className={styles.container} >
      <div className={styles.preview} >
       {
        treeUID &&  <iframe className={`${styles.iframe} ${showBorder && styles.showBorder}`}   src={`/tree/${treeUID}`} title="tree Preview" scrolling="yes" ></iframe>
       }
      </div>
    // </div>
  )
}
