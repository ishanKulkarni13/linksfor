import Nav from "@/components/nav/nav";
import styles from "./admin.module.css";
import Sidebar from "@/components/sidebar/sidebar";
import TopBar from "@/components/topbar/topBar";
export const metadata = {
  title: "Home",
  description: "The home page",
};

export default function RootLayout({ children }) {
  return (
    <>
        <div className={styles.topBarContainer}><TopBar/></div>
        <div className={styles.childrenContainer}>{children}</div>
    </>
  );
}
