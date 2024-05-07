import styles from "./home.module.css";
import "./home.module.css";
import TopBar from "@/components/topbar/topBar";
export const metadata = {
  title: "Home",
  description: "The home page",
};

export default function RootLayout({ children }) {
  return (
    <>
      <dir className={styles.homeLayout}>
        <TopBar />
        {children}
      </dir>
    </>
  );
}
