import Image from "next/image";
import styles from "./profile.module.css";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Pofile({ treeName, treePicture, treeBio }) {

  function getInitials(name) {
    // Split the name by space
    let nameParts = name.trim().split(' ');
    
    // Map over the parts and take the first character, then join them together
    let initials = nameParts.map(part => part.charAt(0).toUpperCase()).join('');
    
    return initials;
  }

  return (
    <div className={styles.profileContainer}>
      <Avatar className={styles.profilePictureContainer}>
        <AvatarImage
          className={styles.profilePicture}
          fill='true'
          src={treePicture.URL}
          alt="Prfile Pic"
        />
        <AvatarFallback delayMs={5*100}>{getInitials(treeName)}</AvatarFallback>
      </Avatar>

      <div className={styles.profileTextContainer}>
        <div className={`${styles.nameContainer}`}>
          {" "}
          <p>{treeName}</p>{" "}
        </div>
        <div className={styles.bioContainer}>
          {" "}
          <p>{treeBio}</p>{" "}
        </div>
      </div>
    </div>
  );
}
