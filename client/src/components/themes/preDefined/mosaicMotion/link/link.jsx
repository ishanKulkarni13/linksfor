import Image from "next/image";
import styles from "./link.module.css";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NextLink from "next/link";

// Reusable FeaturedLink component
function FeaturedLink({ link }) {
  return (
    <NextLink
      className={`${styles.container} ${styles.featuredContainer}`}
      href={link.URL}
    >
      <div className={styles.featuredThumbnailWrapper}>
        {link.thumbnail?.URL && (
          <Image
            className={styles.featuredThumbnail}
            src={link.thumbnail.URL}
            alt="link image"
            fill
            priority
            sizes="(max-width: 600px) 100vw, 480px"
            style={{ objectFit: "cover" }}
          />
        )}
        <div className={styles.featuredOverlay}>
          <div className={styles.featuredText}>
            <p className={styles.featuredTitle}>{link.title}</p>
            {/* Add more info here if needed */}
          </div>
        </div>
      </div>
      <button className={styles.optionsButton}>
        {/* <FontAwesomeIcon icon={faEllipsisVertical} className={styles.optionsIcon}/> */}
      </button>
    </NextLink>
  );
}

export default function Link({ link }) {
  if (link.type == `link`) {
    if (link.layout === "featured") {
      return <FeaturedLink link={link} />;
    }
    return (
      <NextLink className={styles.container} href={link.URL}>
        {link.thumbnail?.URL ? (
          <div className={styles.thumbnailContainer}>
            <Image
              className={styles.thumbnail}
              fill={true}
              src={link.thumbnail.URL}
              alt="link image"
              style={{ objectFit: "cover" }}
            />
          </div>
        ) : (
          <div className={styles.thumbnailPlaceholder}>
            {/* <p className={styles.placeholderText}>No Image</p> */}
          </div>
        )}
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
