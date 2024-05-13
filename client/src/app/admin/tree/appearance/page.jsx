import TreeProfileEditor from "@/components/treeProfileEditor/treeProfileEditor";
import styles from "./appearance.module.css";

export default function Appearance() {
  return (
    <main className={styles.container}>
      <div className={styles.profileEditorContainer}>
        <TreeProfileEditor />
      </div>
    </main>
  );
}
