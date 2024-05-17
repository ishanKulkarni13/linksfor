"use client";
import styles from "./popup.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Input } from "@/components/ui/input";
import { Toaster, toast } from "sonner";

export default function Popup({ close , title,  children }) {
  // handel form submit
  const handleSubmit = async (values) => {

    // here

  };

  return (
    <>
      <div className={`${styles.container}`}>
        <div className={styles.popUpContainer}>
          
          <div className={styles.top}>
            <div className={styles.popUpTitle}>
              <p>{title}</p>
            </div>
            <button className={styles.closeButton} onClick={close}>
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>

          <div className={styles.childrenContainer} >
            {children}
          </div>

        </div>
      </div>
      <Toaster richColors />
    </>
  );
}
