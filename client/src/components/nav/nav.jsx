import styles from "./nav.module.css";
import NavItem from "@/components/nav/navItem/navItem";
import { navLinks } from "@/constants/index";
import { usePathname } from "next/navigation";
import { useRef, useEffect, useState } from "react";

export default function Nav() {
  const pathname = usePathname();
  const containerRef = useRef(null);
  const [barStyle, setBarStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    // Find the active nav item
    const container = containerRef.current;
    if (!container) return;
    const active = container.querySelector("[data-active='true']");
    if (active) {
      const { left, width } = active.getBoundingClientRect();
      const parentLeft = container.getBoundingClientRect().left;
      setBarStyle({
        left: left - parentLeft,
        width,
      });
    }
  }, [pathname]);

  return (
    <nav className={styles.nav} ref={containerRef} style={{ position: "relative" }}>
      {navLinks.map((link, index) => (
        <div className={styles.navItemContainer} key={`navitem${index}`}>
          <NavItem link={link} data-active={pathname === link.path} />
        </div>
      ))}
      <div
        className={styles.activeBar}
        style={{
          left: barStyle.left,
          width: barStyle.width,
          opacity: barStyle.width ? 1 : 0,
        }}
      />
    </nav>
  );
}