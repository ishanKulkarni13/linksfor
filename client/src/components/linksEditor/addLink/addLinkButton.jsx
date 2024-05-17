import styles from "./addLink.module.css";
import AddLinkPopUp from "./addLinkPopUp";
import { useState } from "react";

export default function AddLinkButton({links, setLinks, treeUID}) {
    const [isPopUpActive, setIsPopUpActive] = useState(false);
  function handleAddLinkButtonCLick(e) {
    setIsPopUpActive(true)
  }
  function closePopUp(e) {
    setIsPopUpActive(false)
  }
  return (
      <>
      <button
        className={styles.addLinkButton}
        onClick={handleAddLinkButtonCLick}
      >
        <div>+</div>
        <p>Add Link</p>
      </button>
      {isPopUpActive && <AddLinkPopUp setLinks={setLinks} close={closePopUp}  treeUID={treeUID}/>}
    </>
  );
}
