"use client";
import { toast } from "sonner";
import styles from "./treePreviewToggleButton.module.css";

import { useState } from "react";
import TreePreview from "../treePreview";
import useWindowResize from "@/hooks/useWindowSize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";

export default function TreePreviewToggleButton({ treeUID, alwaysVisible }) {
  const [isPreviewActive, setIsPreviewActive] = useState(false);
  const { width } = useWindowResize();
  function handleToggleButtonCLick(e) {
    setIsPreviewActive((pre) => !pre);
  }
  return (
    <>
      {/* {(width < 1204 || alwaysVisible) && (
        <button
          className={styles.toggleButton}
          onClick={handleToggleButtonCLick}
        >
          <div className={styles.icon}>
            {isPreviewActive ? (
              <FontAwesomeIcon icon={faEyeSlash} />
            ) : (
              <FontAwesomeIcon icon={faEye} />
            )}
          </div>
          <p>Preview</p>
        </button>
      )} */}

      <div className={styles.popUpCOntainer}>
        <div className={styles.treePreviewComponentContainer}>
          <Drawer
            noBodyStyles={true}
            className={styles.drawer}
            open={isPreviewActive}
            onOpenChange={setIsPreviewActive}
          >
            <DrawerTrigger>
              <button
                className={styles.toggleButton}
                onClick={handleToggleButtonCLick}
              >
                <div className={styles.icon}>
                  {isPreviewActive ? (
                    <FontAwesomeIcon icon={faEyeSlash} />
                  ) : (
                    <FontAwesomeIcon icon={faEye} />
                  )}
                </div>
                <p>Preview</p>
              </button>
            </DrawerTrigger>

            <DrawerContent className={`${styles.drawerContent} `}>
              <div className={styles.drawerChildren}>
                {" "}
                <TreePreview treeUID={treeUID} />
              </div>

              <DrawerClose asChild>
                <button
                  className={styles.toggleButton}
                  onClick={handleToggleButtonCLick}
                >
                  <div className={styles.icon}>
                    {isPreviewActive ? (
                      <FontAwesomeIcon icon={faEyeSlash} />
                    ) : (
                      <FontAwesomeIcon icon={faEye} />
                    )}
                  </div>
                  <p>Preview</p>
                </button>
              </DrawerClose>
              {/* <DrawerFooter className={styles.drawerFooter}>
            <DrawerClose className={styles.drawerClose} asChild>
              <button className={styles.drawerCloseButton} variant="outline">
                Close
              </button>
            </DrawerClose>
          </DrawerFooter> */}
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </>
  );
}
