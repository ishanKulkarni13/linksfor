import { Reorder, useDragControls } from "framer-motion";
import EditLinkPanel from "../editLinkPanels/editLinkPanel";
import styles from "./link.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripVertical } from "@fortawesome/free-solid-svg-icons";

export default function Link({ link , deleteLink}) {
  let { type, title, URL, UID, thumbnail, layout, linkLockConfig } = link;

  const handelDeleteButtonClick = ()=>{
    deleteLink(link.UID);
    console.log('link', link);
    console.log('linkUID', link.UID);
  }  


  const controls = useDragControls();
  return (
    <>
      {/* <div className={styles.container}> */}
      <Reorder.Item
        className={styles.DNDItem}
        value={link}
        id={link}
        dragListener={false}
        dragControls={controls}
      >
        <div className={styles.linkContainer}>
          <div className={styles.link}>
            <div className={`${styles.left}, ${styles.DNDIcon}`} onPointerDown={(e) => controls.start(e)} ><FontAwesomeIcon icon={faGripVertical} /> </div>

            <div className={styles.centre}>
              <div className={styles.titleContainer}>
                {/* <input type="text" value={title} /> */}
                <div>{title}</div>
                <span>E</span>
              </div>
              <div className={styles.URLContainer}>
                {/* <input type="text" value={URL} /> */}
                <div>{URL}</div>
                <span>E</span>
              </div>
              <div className={styles.OtherOptionsContainer}>
                <span>A</span>
                <span>B</span>
                <span>C</span>
                <span>D</span>
                <span>A</span>
                <span>A</span>
                <span>A</span>
              </div>
            </div>

            <div className={styles.right}>
              <button className={styles.deleteButton} onClick={handelDeleteButtonClick} >D</button>
            </div>
          </div>

          {/* <EditLinkPanel className={styles.editPanelContainer} /> */}
        </div>
      </Reorder.Item>
      {/* </div> */}
    </>
  );
}
