"use client";
import styles from "./dialog.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faMinus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

export default function CustomeDialog({ close, title, children }) {
  return (
    <>
      <Dialog className={`${styles.container}`}>
          <div className={styles.top}>
            <div className={styles.popUpTitle}>
              <h1>{title}</h1>
            </div>
            {close ? (
              <button className={styles.closeButton} onClick={close}>
                <FontAwesomeIcon icon={faXmark} />
              </button>
            ) : (
              <div></div>
            )}
          </div>

          <div className={styles.childrenContainer}>{children}</div>
      </Dialog>

      
    </>
  );
}
