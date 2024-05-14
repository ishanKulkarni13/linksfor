import {
  faLink,
  faShare,
  faShareAlt,
  faShareNodes,
  faShareSquare,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./mobileTopBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Nav from "@/components/nav/nav";
import { faBluetooth } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";

export default function MobileTopBar() {
  return (
    <div className={styles.mobieTopBarContainer}>
      <div className={styles.topContainer}>
        <div className={styles.logoContainer}>
          <FontAwesomeIcon className={styles.logo} icon={faLink} />
        </div>

        <div className={styles.share}>
          <FontAwesomeIcon className={styles.shareIcon} icon={faShare} />
          <span>Share</span>
        </div>

        <Link className={styles.profile} href={'/admin'}>
          <div className={styles.profileImgContainer}>
            <FontAwesomeIcon icon={faUser} />
          </div>
        </Link>
      </div>

      <div className={styles.bottomContainer}>
        <Nav className={styles.nav} />
        {/* <div className={styles.temp}> hii</div> */}
      </div>
    </div>
  );
}
