import TreePreview from "@/components/treePreview/treePreview";
import styles from "./style.module.css";
import TreePreviewToggleButton from "@/components/treePreview/treePreviewToggleButton/treePreviewToggleButton";
export default function AdminTreeEditRootLayout({ children }) {
  return (
    <>
    <div className={styles.rootContainer}>
      <div className={styles.childrenContainer}>{children}</div>
      <div className={styles.treePreviewContainer}>
        <div className={styles.treePreview}>
          <TreePreview showBorder={true} />
        </div>
      </div>
    </div>
    <TreePreviewToggleButton alwaysVisible />
    </>
  );
}
