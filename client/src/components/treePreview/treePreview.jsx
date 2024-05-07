import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from "./treePreview.module.css"
import { faArrowsRotate, faShareFromSquare } from "@fortawesome/free-solid-svg-icons"
export default function TreePreview({refresh}) {
  return (
    <div className={styles.container} >
      <div className={styles.preview} >
        <iframe className={styles.iframe}  src="/regester" title="tree Preview" ></iframe>
      </div>
    </div>
  )
}
