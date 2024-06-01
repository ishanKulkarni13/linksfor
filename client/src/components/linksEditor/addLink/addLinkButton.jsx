import styles from "./add.module.css";
import AddPopUp from "./addPopUp";
import { useState } from "react";

export default function AddButton({links, setLinks, treeUID, type}) {
    const [isPopUpActive, setIsPopUpActive] = useState(false);
  function handleAddLinkButtonCLick(e) {
    setIsPopUpActive(true)
  }
  function closePopUp() {
    setIsPopUpActive(false)
  }
  return (
      <>
      <button
        className={styles.addLinkButton}
        onClick={handleAddLinkButtonCLick}
      >
        <div>+</div>
        {
          (type == `header`)?( <p>Add Header</p>):(<p>Add Link</p>)
        }
        </button>
      {isPopUpActive && <AddPopUp type={type} setLinks={setLinks} close={closePopUp}  treeUID={treeUID}/>}
    </>
  );
}
