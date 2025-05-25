"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Nav from "../nav/nav";
import styles from "./topBar.module.css";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { ThemeModeToggle } from "../buttons/theme/changeThemeButton";
import { ShareTreeButton } from "../shareTree/shareTreeButton/shareTreeButton";
export default function TopBar() {
  return (
    <div className={styles.topBarContainer}>
      <div className={styles.mobieTopBarContainer}>
        <div className={styles.topContainer}>
          <div className={styles.logoContainer}>
            <FontAwesomeIcon className={styles.icon} icon={faLink} />
          </div>

          <div className={styles.share}>
            <ShareTreeButton/>
          </div>

          <div className={styles.profile} href={"/admin"}>
            <div className={styles.profileImgContainer}>
              {/* <FontAwesomeIcon  className={styles.icon} icon={faUser} /> */}
              <ThemeModeToggle />
            </div>
          </div>
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

        <div className={styles.right}>
          
          <ThemeModeToggle className={styles.themetogglebtn} />
        </div>

        <ShareTreeButton type={'floating'} />
      </div>
    </div>
  );
}
