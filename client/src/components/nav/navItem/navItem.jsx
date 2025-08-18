import Link from "next/link";
import styles from "./navItem.module.css";
import { PiLinkSimpleHorizontal } from "react-icons/pi";
import { AiOutlineInstagram } from "react-icons/ai"; 
import { CiSettings } from "react-icons/ci";
import { FaRegEye } from "react-icons/fa6";
import { usePathname } from "next/navigation";

export default function NavItem({ link, ...props }) {
  const { title, path } = link;
  const pathname = usePathname();
  const isActive = pathname === path;

  function getIcon(title) {
    switch (title.toLowerCase()) {
      case "links":
        return <PiLinkSimpleHorizontal className={styles.icon} />;
      case "appearance":
        return <FaRegEye strokeWidth={"0.001px"} className={styles.icon} />;
      case "socials":
        return <AiOutlineInstagram className={styles.icon} />;
      case "more":
        return <CiSettings strokeWidth={0.4} className={styles.icon} />;
      default:
        return null;
    }
  }

  return (
    <Link
      className={styles.container}
      href={path}
      data-active={isActive}
      {...props}
    >
      <span className={styles.title}>{title}</span>
      <div className={styles.iconContaier}>{getIcon(title)}</div>
    </Link>
  );
}