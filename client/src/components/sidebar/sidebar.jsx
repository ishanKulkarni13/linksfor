import Nav from "@/components/nav/nav";
import styles from "./sidebar.module.css";
export default function Sidebar() {
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.logoContainer}>LOGO</div>
        <Nav className={styles.nav} />
        <div className={styles.profileContainer}>
          PROFILE CONTAINER
          <div className={styles.profile}>
            <div className={styles.profileImgContainer}></div>
            <div className={styles.profileTextContainer}></div>
          </div>
          <div className={styles.logoutContainer}></div>
        </div>
      </div>
    </div>
  );
}
