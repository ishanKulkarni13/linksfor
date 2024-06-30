import TreeAppearanceEditor from "@/components/treeAppearanceEditor/treeAppearanceEditor";
import styles from './appearance.module.css'

export default function Appearance() {
  return (
    <div className={styles.PageWrapper}>
    <TreeAppearanceEditor/>
    </div>
  );
}
