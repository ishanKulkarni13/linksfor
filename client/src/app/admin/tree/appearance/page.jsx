import styles from "./appearance.module.css";
import dynamic from "next/dynamic";

const DynamicTreeProfileEditor = dynamic(()=> import('@/components/treeProfileEditor/treeProfileEditor'), {
  loading: ()=> <div  className={styles.dynamicContainer}> <p>Loading Profile Editor</p> </div>, ssr:false 
})
export default function Appearance() {
  return (
    <main className={styles.container}>
      <div className={styles.profileEditorContainer}>
        <DynamicTreeProfileEditor/>
      </div>
    </main>
  );
}
