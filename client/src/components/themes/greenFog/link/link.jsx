import Image from "next/image";
import styles from "./link.module.css";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function LinkGreenFog({ link }) {
  return (
    <Link className={styles.container} href={link.URL} >
      <div className={styles.thumbnailContainer}>
        {/* {link.thumbnail.URL && (
          <Image
            className={styles.thumbnail}
            fill={true}
            object-fit="cover"
            src={link.thumbnail}
          />
        )} */}
        {/* <Image
            className={styles.thumbnail}
            fill={true}
            object-fit="cover"
            src= {"http://res.cloudinary.com/kakashib2k/image/upload/v1713685024/uiccf1wbzyioazqgve5q.png"}
          /> */}
      </div>
      <div className={styles.textContainer}>
        <p className={styles.title} >{link.title}</p>
      </div>
      <button className={styles.optionsButton}>
      {/* <FontAwesomeIcon icon={faEllipsisVertical} className={styles.optionsIcon}/> */}
      </button>
    </Link>
  );
}
