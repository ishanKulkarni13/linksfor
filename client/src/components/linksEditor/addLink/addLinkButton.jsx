import { FaPlus } from "react-icons/fa6";
import styles from "./add.module.css";
import AddPopUp from "./addPopUp";
import { useState } from "react";

export default function AddButton({links, setLinks, treeUID, type ,disabled}) {
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
        disabled={disabled}
        className={styles.addLinkButton}
        onClick={handleAddLinkButtonCLick}
      >
        <div className={styles.addIconContainer}><FaPlus/> </div>
        {
          (type == `header`)?( <p>Header</p>):(<p>Link</p>)
        }
        </button>
      {isPopUpActive && <AddPopUp type={type} setLinks={setLinks} close={closePopUp}  treeUID={treeUID}/>}
    </>
  );
}
