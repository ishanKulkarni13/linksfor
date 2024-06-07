import Link from "next/link";
import styles from "./navItem.module.css";
import {PiLinkSimpleHorizontal} from 'react-icons/pi'
import { IoAnalytics } from "react-icons/io5";
import { CiSettings } from "react-icons/ci";
import {FaRegEye} from 'react-icons/fa6'



export default function NavItem({ link }) {
  const { title, path } = link;
  
  function getIcon(title) {
    switch (title.toLowerCase()) {
      case 'links':
        return <PiLinkSimpleHorizontal className={styles.icon} />;
      case 'appearance':
        return <FaRegEye  strokeWidth={'0.001px'}  className={styles.icon} />;
      case 'analytics':
        return <IoAnalytics className={styles.icon} />;
      case 'more':
        return <CiSettings strokeWidth={0.4} className={styles.icon}  />;
      default:
        return null;
    }
  }

  return (
    <Link  className={styles.container} href={path}>
      <span className={styles.title}>{title}</span>
      <div className={styles.iconContaier}>
        {
          getIcon(title)
        }
      </div>

      
    </Link>
  );
}
