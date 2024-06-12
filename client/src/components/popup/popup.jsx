"use client";
import styles from "./popup.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faMinus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Input } from "@/components/ui/input";
import { Toaster, toast } from "sonner";

export default function Popup({ close, title, children }) {
  return (
    <>
      <div className={`${styles.container}`}>
        <div className={styles.popUpContainer}>
          <div className={styles.top}>
            <div className={styles.popUpTitle}>
              <p>{title}</p>
            </div>
            {close ? (
              <button className={styles.closeButton} onClick={close}>
                <FontAwesomeIcon icon={faXmark} />
              </button>
            ) : (
              <div>
              </div>
            )}
          </div>

          <div className={styles.childrenContainer}>{children}</div>
        </div>
      </div>
      <Toaster richColors />
    </>
  );
}
