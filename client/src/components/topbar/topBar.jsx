import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Nav from "../nav/nav";
import styles from "./topBar.module.css";
import { faLink, faUser } from "@fortawesome/free-solid-svg-icons";
export default function TopBar() {
  return (
    <div className={styles.topBarContainer}>
      <div className={styles.logoContainer}>
        <FontAwesomeIcon icon={faLink} />
      </div>
      <Nav />
      <div className={styles.profileContainer}>
        <div className={styles.profile}>
          <div className={styles.profileImgContainer}>
            <FontAwesomeIcon icon={faUser} />
          </div>
        </div>
      </div>
    </div>
  );
}
