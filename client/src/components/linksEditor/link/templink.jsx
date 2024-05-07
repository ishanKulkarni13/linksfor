import { Reorder, useDragControls } from "framer-motion";
import EditLinkPanel from "../editLinkPanels/editLinkPanel";
import styles from "./link.module.css";

export default function TempLink({ link }) {
  let { type, title, URL, UID, thumbnail, layout, linkLockConfig } = link;

  const controls = useDragControls();
  return (
    <>
      <Reorder.Item
        className={styles.DNDItem}
        value={link}
        id={link}
        dragListener={false}
        dragControls={controls}
      >
        <div
          className={`${styles.left}, ${styles.DNDIcon}`}
          onPointerDown={(e) => controls.start(e)}
        ></div>
      </Reorder.Item>
      {/* </div> */}
    </>
  );
}
