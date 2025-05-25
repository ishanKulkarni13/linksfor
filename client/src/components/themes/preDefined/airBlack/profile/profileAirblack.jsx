import Image from "next/image";
import styles from "./profileAirBlack.module.css";

export default function PofileAirblack({ treeName, treePicture, treeBio }) {
  return (
    <div className={styles.profileContainer}>
      <div className={styles.profilePictureContainer}>
        <Image
          className={styles.profilePicture}
          fill={true}
          // object-fit="cover"
          src={treePicture.URL}
          alt="profile pic"
        ></Image>
      </div>
      <div className={styles.profileTextContainer}>
        <div className={styles.nameContainer}> <p>{treeName}</p> </div>
        <div className={styles.bioContainer}> <p>{treeBio}</p> </div>
      </div>
    </div>
  );
}
