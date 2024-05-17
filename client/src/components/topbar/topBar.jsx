"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Nav from "../nav/nav";
import styles from "./topBar.module.css";
import { faLink, faShare, faUser } from "@fortawesome/free-solid-svg-icons";
import useWindowResize from "@/hooks/useWindowSize";
import Link from "next/link";
import ShareTreeButton from "../shareTree/shareTreeButton/shareTreeButton";
export default function TopBar() {
  const { width, heigth } = useWindowResize();
  return (
    <div className={styles.topBarContainer}>

      <div className={styles.mobieTopBarContainer}>
        <div className={styles.topContainer}>
          <div className={styles.logoContainer}>
            <FontAwesomeIcon className={styles.icon} icon={faLink} />
          </div>

          <div className={styles.share}>
            <ShareTreeButton/>
            {/* <FontAwesomeIcon className={styles.icon} icon={faShare} />
            <span>Share</span> */}
          </div>

          <Link className={styles.profile} href={"/admin"}>
            <div className={styles.profileImgContainer}>
              <FontAwesomeIcon  className={styles.icon} icon={faUser} />
            </div>
          </Link>
        </div>

        <div className={styles.bottomContainer}>
          <Nav className={styles.nav} />
          {/* <div className={styles.temp}> hii</div> */}
        </div>
      </div>
        {/* desktop */}
      <div className={styles.desktopTopBarContainer}>
        <div className={styles.logoContainer}>
          <FontAwesomeIcon className={styles.icon} icon={faLink} />
          <span>Link</span>
        </div>

        <div className={styles.centre}>
          <Nav />
        </div>

        <Link className={styles.profile} href={"/admin"}>
          <div className={styles.profileImgContainer}>
            <FontAwesomeIcon className={styles.icon} icon={faUser} />
          </div>
        </Link>
      </div>
    </div>
  );
}
