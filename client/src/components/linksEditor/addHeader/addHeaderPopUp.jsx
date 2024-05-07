import styles from "./addHeader.module.css";

import React from 'react'

export default function AddHeaderPopUp({close}) {
  return (
    <div className={styles.popUpContainer}>
       <button
        className={styles.closeButton}
        onClick={close}
      >
        <div>+</div>
        <p>Add Link</p>
      </button>
    </div>
  )
}
