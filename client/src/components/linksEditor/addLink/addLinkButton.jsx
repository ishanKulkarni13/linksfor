import styles from "./addLink.module.css";
import AddLinkPopUp from "./addLinkPopUp";
import { useState } from "react";

export default function AddLinkButton({links, setLinks}) {
    const [isPopUpActive, useIsPopUpActive] = useState(false);
  function handleAddLinkButtonCLick(e) {
    useIsPopUpActive(true)
  }
  function closeAddLinkPopUp(e) {
    useIsPopUpActive(false)
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
      {isPopUpActive && <AddLinkPopUp setLinks={setLinks} close={closeAddLinkPopUp}  />}
    </>
  );
}
