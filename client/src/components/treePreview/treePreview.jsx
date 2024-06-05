import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from "./treePreview.module.css"
import { faArrowsRotate, faShareFromSquare } from "@fortawesome/free-solid-svg-icons"
export default function TreePreview({refresh, treeUID, showBorder}) {
  console.log(`treeUID in treePreview is `,treeUID);
  return (
    // <div className={styles.container} >
      <div className={styles.preview} >
        <iframe className={`${styles.iframe} ${showBorder && styles.showBorder}`}   src={`/tree/${treeUID}`} title="tree Preview" scrolling="yes" ></iframe>
      </div>
    // </div>
  )
}
