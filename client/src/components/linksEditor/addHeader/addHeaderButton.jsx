import { Toaster, toast } from "sonner";
import styles from "./addHeader.module.css";
import AddHeaderPopUp from "./addHeaderPopUp";
import { useState } from "react";

export default function AddHeaderButton() {
    const [isPopUpActive, useIsPopUpActive] = useState(false);
  function handleaddHeaderButtonCLick(e) {
    toast("POP POP");
    useIsPopUpActive(true)
  }
  function closeaddHeaderPopUp(e) {
    toast("PopUP close");
    useIsPopUpActive(false)
  }
  return (
    <>
      <button
        className={styles.addHeaderButton}
        onClick={handleaddHeaderButtonCLick}
      >
        <div>+</div>
        <p>Add Header</p>
      </button>
      {isPopUpActive && <AddHeaderPopUp close={closeaddHeaderPopUp}  />}
      {/* <Toaster /> */}
    </>
  );
}
