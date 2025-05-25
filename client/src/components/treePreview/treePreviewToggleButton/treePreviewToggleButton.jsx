"use client";
import { toast } from "sonner";
import styles from "./treePreviewToggleButton.module.css";

import { useState } from "react";
import TreePreview from "../treePreview";
import useWindowResize from "@/hooks/useWindowSize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Drawer } from "vaul";
// import {
//   Drawer,
//   DrawerClose,
//   DrawerContent,
//   DrawerTrigger,
// } from "@/components/ui/drawer";

export default function TreePreviewToggleButton({ treeUID, alwaysVisible }) {
  const [isPreviewActive, setIsPreviewActive] = useState(false);
  const { width } = useWindowResize();
  function handleToggleButtonCLick(e) {
    setIsPreviewActive((pre) => !pre);
  }

  return(
       <Drawer.Root>
      <Drawer.Trigger asChild>
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
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className={`bg-gray-100 flex flex-col rounded-t-[10px] mt-24 h-fit fixed bottom-0 left-0 right-0 outline-none ${styles.drawerContent}`}>
          
            <div className={styles.drawerChildren}>
          {" "}
          <TreePreview treeUID={treeUID} />
        </div>


            < Drawer.Close asChild>
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
        </Drawer.Close >

        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )


}
