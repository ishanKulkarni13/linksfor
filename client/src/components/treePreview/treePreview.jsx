"use client";
import PortalIframe from "@/components/portalIFrame/iframe.jsx";
import styles from "./treePreview.module.css";
import { useTreeUID } from "@/hooks/treeUID";

export default function TreePreview({ refresh, treeUID, showBorder }) {
  const componentTreeUID = useTreeUID();

  if (!treeUID) treeUID = componentTreeUID;

  return (
    // <div className={styles.container} >
    <div className={styles.preview}>
      {treeUID && (
        <PortalIframe
          className={`${styles.iframe} ${showBorder && styles.showBorder}`}
          src={`/tree/${treeUID}`}
          title="tree Preview"
          scrolling="yes"
        >
        </PortalIframe>
      )}
      
    </div>
    // </div>
  );
}
