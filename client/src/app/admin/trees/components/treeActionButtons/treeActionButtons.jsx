"use client";
import { useState } from "react";
import TreeActionPopups, { DeleteTree } from "../treeActionPopups/treeActionPopups";
import styles from "./treeActionButtons.module.css";

export default function TreeActionButtons({ treeUID }) {

  const [popup, setPopup] = useState(false)

  const buttons = [
    {
      type: "deleteTree",
      name: "Detete Tree",
      popupComponentKey: 'deleteTree'
    },
    {
      type: "treeUniqueName",
      name: "Change TUIN",
      popupComponentKey: 'deleteTree'
    },
    {
      type: "selectAsDefaultTree",
      name: "Select as Default",
      popupComponentKey: 'selectAsDefaultTree'
    }
  ];

  const closePopup = ()=>setPopup(false);

  return (
    <>
      <div className={styles.treeActionsButtons}>
        {buttons.map((button) => {
          return (
            <button
              key={`${button.type}-${treeUID}`}
              className={`${styles.treeActionsButton}`}
              onClick={()=> setPopup(button.popupComponentKey)}
            >{button.name}</button>
          );
        })}
      </div>
        {
          popup && <TreeActionPopups treeUID={treeUID} close={closePopup}  popup={popup}/>
        }
    </>
  );
}
