import Image from "next/image";
import styles from "./link.module.css";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NextLink from "next/link";

export default function Link({ link }) {
  if (link.type == `link`) {
    return (
      <NextLink className={styles.container} href={link.URL}>
        <div className={styles.thumbnailContainer}>
        {link.thumbnail?.URL && (
            <Image
              className={styles.thumbnail}
              fill={true}
              object-fit="cover"
              src={link.thumbnail.URL}
              
          alt="link image"
            />
          )}
        </div>
        <div className={styles.textContainer}>
          <p className={styles.title}>{link.title}</p>
        </div>
        <button className={styles.optionsButton}>
          {/* <FontAwesomeIcon icon={faEllipsisVertical} className={styles.optionsIcon}/> */}
        </button>
      </NextLink>
    );
  } else {
    return (
      <div className={styles.headerContainer}>
        <p>{link.title}</p>
      </div>
    );
  }
}
