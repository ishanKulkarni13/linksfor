import Nav from "@/components/nav/nav";
import styles from "./desktopTopBar.module.css";
import { faLink, faShare, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";

export default function DesktopTopBar() {
  return (
    <div className={styles.desktopTopBarContainer}>
      <div className={styles.logoContainer}>
        <FontAwesomeIcon className={styles.logo} icon={faLink} />
        <span>Link</span>
      </div>

      <div className={styles.centre}>
        <Nav />
      </div>

      <Link className={styles.profile} href={"/admin"}>
        <div className={styles.profileImgContainer}>
          <FontAwesomeIcon icon={faUser} />
        </div>
      </Link>
    </div>
  );
}
