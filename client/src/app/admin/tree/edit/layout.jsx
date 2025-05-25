import TreePreview from "@/components/treePreview/treePreview";
import styles from "./style.module.css";
import TreePreviewToggleButton from "@/components/treePreview/treePreviewToggleButton/treePreviewToggleButton";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
export default function AdminTreeEditRootLayout({ children }) {
  
  // return(


  //     <ResizablePanelGroup
  //     direction="horizontal" className={styles.rootContainer}
  //   >

  //     <ResizablePanel defaultSize={25}>
  //        <div className={styles.childrenContainer}>{children}</div>
  //     </ResizablePanel>

  //     <ResizableHandle withHandle />

  //     <ResizablePanel defaultSize={75}>
  //        <div className={styles.treePreviewContainer}>
  //         <TreePreview className={styles.treePreview} showBorder={true} />
  //       </div>
  //     </ResizablePanel>

  //   </ResizablePanelGroup>
  // ) 
  
  return (
    <>
      <div className={styles.rootContainer}>
        <div className={styles.childrenContainer}>{children}</div>
 
        {/* <div className={styles.treePreviewContainer}>
          <TreePreview className={styles.treePreview} showBorder={true} />
        </div> */}
      </div>
      <TreePreviewToggleButton alwaysVisible />
    </>
  );
}
