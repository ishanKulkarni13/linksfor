import styles from "./nav.module.css";
import NavItem from "@/components/nav/navItem/navItem";
import { navLinks } from "@/constants/index";
export default function Nav() {
  return (
    <nav className={styles.nav}>
     {navLinks.map((link, index)=>{
      return(
        <div className={styles.navItemContainer} key={`navitem${index}`}>
          <NavItem link={link} className={styles.navItem}/>
        </div>
      )
     })}
    </nav>
  );
}
