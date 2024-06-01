"use client";
import { Toaster, toast } from "sonner";
import styles from "./treePreviewToggleButton.module.css";

import { useState } from "react";
import TreePreview from "../treePreview";
import useWindowResize from "@/hooks/useWindowSize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function TreePreviewToggleButton({ treeUID, alwaysVisible }) {
  const [isPreviewActive, setIsPreviewActive] = useState(false);
  const { width } = useWindowResize();
  function handleToggleButtonCLick(e) {
    setIsPreviewActive((pre) => !pre);
  }
  return (

    <>
      {(width < 1204 || alwaysVisible) && (
        <button
          className={styles.toggleButton}
          onClick={handleToggleButtonCLick}
        >
          <div className={styles.icon}>
            {
              (isPreviewActive)?(<FontAwesomeIcon icon={faEyeSlash} />):(<FontAwesomeIcon icon={faEye} />)
            }
            
          </div>
          <p>Preview</p>
        </button>
      )}

      {isPreviewActive && (
        <div className={styles.popUpCOntainer}>
          <div className={styles.treePreviewComponentContainer}>
            <TreePreview treeUID={treeUID} />
          </div>
        </div>
      )}
    </>
  );
}
