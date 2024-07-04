import TreePreview from "@/components/treePreview/treePreview";
import styles from "./style.module.css";
export default function AdminTreeEditRootLayout({ children }) {
  return (
    <div className={styles.rootContainer}>
      <div className={styles.childrenContainer}>{children}</div>
      <div className={styles.treePreviewContainer}>
        <div className={styles.treePreview}>
          
          <TreePreview showBorder={true} />
        </div>
      </div>
    </div>
  );
}
