import TreeAppearanceEditor from "@/components/treeAppearanceEditor/treeAppearanceEditor";
// import styles from "./appearance.module.css";
// import dynamic from "next/dynamic";

// const DynamicTreeProfileEditor = dynamic(()=> import('@/components/treeAppearanceEditor/treeProfileEditor/treeProfileEditor'), {
//   loading: ()=> <div  className={styles.dynamicContainer}> <p>Loading Profile Editor</p> </div>, ssr:false 
// })

// const DynamicTreeThemeEditor = dynamic(()=> import('@/components/treeAppearanceEditor/editTreeTheme/editTreeTheme'), {
//   loading: ()=> <div  className={styles.dynamicContainer}> <p>Loading theme Editor</p> </div>, ssr:false 
// })
export default function Appearance() {
  return (
    // <main className={styles.container}>
    //   <div className={styles.profileEditorContainer}>
    //     <DynamicTreeProfileEditor/>
    //   </div>
    //   <div className={styles.profileThemeEditorContainer}>
    //     <DynamicTreeThemeEditor/>
    //   </div>
    // </main>
    <TreeAppearanceEditor/>
  );
}
