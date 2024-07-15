"use client";
import PortalIframe from "@/components/portalIFrame/iframe.jsx";
import styles from "./treePreview.module.css";
import { useTreeUID } from "@/hooks/treeUID";
import LinksEditor from "../linksEditor/linksEditor";
import Tree from "../themes/tree";

export default function TreePreview({ refresh, treeUID, showBorder }) {
  const componentTreeUID = useTreeUID();

  if (!treeUID) treeUID = componentTreeUID;


  const testTree = {
    treeName: 'testinggg',
    treePicture: 'ss',
    treeProfileLayout: 'classic',
    treeBio: 'hi tester',
    treeDescription: 'are you a AI?',
    treeContent: {
        links: [],
        socials: [],
  
    },
    theme: {
        selectedTheme: {
            themeID: 911111
  
        },
    },
  }

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
          {/* <Tree tree={testTree}/> */}
        </PortalIframe>
      )}
    </div>
    // </div>
  );
}
