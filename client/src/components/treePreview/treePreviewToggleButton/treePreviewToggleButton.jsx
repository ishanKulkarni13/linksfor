import { Toaster, toast } from "sonner";
import styles from "./treePreviewToggleButton.module.css";

import { useState } from "react";
import TreePreview from "../treePreview";

export default function TreePreviewToggleButton() {
  const [isPreviewActive, setIsPreviewActive] = useState(false);
  function handleToggleButtonCLick(e) {
    setIsPreviewActive((pre) => !pre);
  }
  return (
    <>
      <button className={styles.toggleButton} onClick={handleToggleButtonCLick}>
        <div className={styles.icon}>P</div>
        <p>Preview</p>
        {isPreviewActive && <p>A</p>}
      </button>
      {isPreviewActive && (
        <div className={styles.popUpCOntainer}>
          <div className={styles.treePreviewComponentContainer}>
            <TreePreview />
          </div>
        </div>
      )}
      {/* <Toaster /> */}
    </>
  );
}
