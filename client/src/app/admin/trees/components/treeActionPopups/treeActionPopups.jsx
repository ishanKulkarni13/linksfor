"use client";
import Popup from "@/components/popup/popup";
import styles from "./treeActionPopups.module.css";
import { deleteTree } from "@/action/treeActions";
import { toast } from "sonner";
import { useState } from "react";
import { useSelectTree } from "@/hooks/selectTree";
import { useTreeUID } from "@/hooks/treeUID";

export default function TreeActionPopups({ popup, treeUID, close }) {
  if (popup == "deleteTree") {
    return <DeleteTree treeUID={treeUID} close={close} />;
  } else {
    return <> No popup </>;
  }
}

export function DeleteTree({ treeUID, close }) {
  const [error, setError] = useState(false);
  const selectTree = useSelectTree();
  const selectedTreeUID = useTreeUID();

  const callDeleteTree = async () => {
    setError(false);
    try {
     toast.info(`Deletin Tree...`);
      const res = await deleteTree({ treeUID });
      if (!res.success) {
        setError(res.message);
        toast.error(res.message);
      } else {
        setError(false);
        toast(selectedTreeUID)
        if(selectedTreeUID == treeUID){
           selectTree();
        }
        toast.success(`Deleted tree`);
        return close();
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <Popup title={`Delete Tree`} close={close || false}>
      <div className={styles.deleteTree}>
        <div className={styles.top}>
          <h5>Are you sure you want to delete tree?</h5>
        </div>

        <div className={styles.buttons}>
          <button className={styles.delete} onClick={callDeleteTree}>
            {" "}
            Yes, delete it
          </button>
          <button className={styles.close} onClick={close}>
            Cancel
          </button>
        </div>

        {error && <p className={styles.errorText}>{error}</p>}
      </div>
    </Popup>
  );
}
