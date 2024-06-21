"use client";
import Popup from "@/components/popup/popup";
import styles from "./treeActionPopups.module.css";
import {
  deleteTree,
  selectTreeAsProfileDefaultTree,
} from "@/action/treeActions";
import { toast } from "sonner";
import { useState } from "react";
import { useSelectTree } from "@/hooks/selectTree";
import { useTreeUID } from "@/hooks/treeUID";

export default function TreeActionPopups({ popup, treeUID, close }) {
  if (popup == "deleteTree") {
    return <DeleteTreePopup treeUID={treeUID} close={close} />;
  } else if (popup == "selectAsDefault") {
    return <SelectTreeAsDefaultPopup treeUID={treeUID} close={close} />;
  } else {
    return <> No popup </>;
  }
}

export function DeleteTreePopup({ treeUID, close }) {
  const [error, setError] = useState(false);
  const selectTree = useSelectTree();
  const selectedTreeUID = useTreeUID();

  const callDeleteTree = async () => {
    setError(false);
    try {
      toast.info(`Deleting Tree...`,{
        id:'deleting'
      });

      const res = await deleteTree(treeUID);
      if (!res.success) {
        setError(res.message);
        toast.error(res.message, {
          id: 'deleting'
        });
      } else {
        setError(false);
        if (selectedTreeUID == treeUID) {
          selectTree();
        }
        toast.success(`Deleted tree`,{
          id: 'deleting'
        });
        return close();
      }
    } catch (error) {
      toast.error(error.message,{
        id: deleting
      });
    }
  };

  return (
    <Popup title={`Delete Tree`} close={close || false}>
      <div className={styles.deleteTree}>
        <div className={styles.top}>
          <h5>Are you sure you want to delete tree?</h5>
        </div>

        <div className={styles.buttons}>
          <button className={styles.yes} onClick={callDeleteTree}>
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

export function SelectTreeAsDefaultPopup({ treeUID, close }) {
  const [error, setError] = useState(false);
  const selectTreeOnClientSide = useSelectTree();

  const callSelectTreeAsProfileDefaultTree = async () => {
    setError(false);
    let toastID;
    try {
       toastID = toast.info(`Selecting Tree...`);
      const res = await selectTreeAsProfileDefaultTree(treeUID);
      if (!res.success) {
        setError(res.message);
        toast.dismiss(toastID)
        toast.error(res.message);
      } else {
        setError(false);

        selectTreeOnClientSide(treeUID);

        toast.dismiss(toastID)
        toast.success(`Selected tree as profile Default Tree`, );
        return close();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Popup title={`Select as Default`} close={close}>
      <div className={styles.selectTree}>
        <div className={styles.top}>
          <h5>Do you want to select this tree as your profile default tree?</h5>
        </div>

        <div className={styles.buttons}>
          <button
            className={styles.yes}
            onClick={callSelectTreeAsProfileDefaultTree}
          >
            {" "}
            Yes, select it
          </button>
          <button className={styles.close} onClick={close}>
            No
          </button>
        </div>

        {error && <p className={styles.errorText}>{error}</p>}
      </div>
    </Popup>
  );
}
