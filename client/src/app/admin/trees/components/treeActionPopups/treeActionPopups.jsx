"use client";
import Popup from "@/components/popup/popup";
import styles from "./treeActionPopups.module.css";
import { deleteTree } from "@/action/treeActions";

export default function TreeActionPopups({ popup, treeUID, close }) {
  if (popup == "deleteTree") {
    return <DeleteTree treeUID={treeUID} close={close} />;
  } else {
    return <> No popup </>;
  }
}

export function DeleteTree({ treeUID, close }) {

  const callDeleteTree = async ()=>{

    try {
      const res = await deleteTree({treeUID});
      if(!res.success){
        toast.error(res.message)
      } else{
        toast.success(`deleted tree`);
        return close()
      }


    } catch (error) {
      toast.error('error catched wite deliting tree:', error);
    }
  }


  return (
    <Popup title={`Delete Tree`} close={close || false}>
      <div className={styles.deleteTree}>
        <div className={styles.top} >
          <h5>Are you sure you want to delete tree?</h5>
        </div>
        <div  className={styles.buttons} >
          <button onClick={callDeleteTree}  > Yes, delete it</button>
          <button onClick={close} >Cancel</button>
        </div>
      </div>
    </Popup>
  );
}
