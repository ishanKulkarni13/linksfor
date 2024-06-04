import Image from "next/image";
import styles from "./linkAirBlack.module.css";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function LinkAirblack({ link }) {
  if (link.type != `header`) {
    return (
      <Link className={styles.container} href={link.URL}>
        <div className={styles.thumbnailContainer}>
          {link.thumbnail?.URL && (
            <Image
              className={styles.thumbnail}
              fill={true}
              object-fit="cover"
              src={link.thumbnail.URL}
            />
          )}
        </div>
        <div className={styles.textContainer}>
          <p className={styles.title}>{link.title}</p>
        </div>
        <button className={styles.optionsButton}>
          {/* <FontAwesomeIcon icon={faEllipsisVertical} className={styles.optionsIcon}/> */}
        </button>
      </Link>
    );
  } else {
    return (
      <div className={styles.headerContainer}>
        <p>{link.title}</p>
      </div>
    );
  }
}
