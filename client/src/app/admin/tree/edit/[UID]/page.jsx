"use client";

import LinksEditor from "@/components/linksEditor/linksEditor";
import TreePreview from "@/components/treePreview/treePreview";
import styles from "./editTree.module.css";
import Nav from "@/components/nav/nav";
export default function TreeEdit() {
  return (
    <div className={styles.container}>
      <div className={styles.linksEditorContainer}>
        <LinksEditor className={styles.linksEditor} />
      </div>
      <div className={styles.treePreviewContainer}>
        <TreePreview />
      </div>
    </div>
  );
}
