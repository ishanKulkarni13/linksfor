"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./shareTreeButton.module.css";
import { faCheck, faCopy, faShare } from "@fortawesome/free-solid-svg-icons";
import ShareTreePopup from "../shareTreePopup/shareTreePopup";
import { useEffect, useState } from "react";
import Popup from "@/components/popup/popup";
import { toast } from "sonner";

export default function ShareTreeButton() {
  const [isPopUpActive, setIsPopUpActive] = useState(false);
  
  function onShareButtonCLick() {
    setIsPopUpActive(true);
  }
  function closeAddLinkPopUp() {
    setIsPopUpActive(false);
  }
  
  return (
    <>
       {/* button */}
      <button onClick={onShareButtonCLick} className={styles.container}>
        <FontAwesomeIcon className={styles.icon} icon={faShare} />
        <span>Share</span>
      </button>

       {/* Popup  */}
      {isPopUpActive && <ShareTreePopup close={closeAddLinkPopUp} />}
    </>
  );
}
