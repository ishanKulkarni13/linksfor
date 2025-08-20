import Image from "next/image";
import styles from "./profile.module.css";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Pofile({ treeName, treePicture, treeBio }) {

  function getInitials(name) {
    if (!name || typeof name !== "string") return "";

    // Remove leading special characters like '@', '#', etc.
    let cleaned = name.trim().replace(/^[^a-zA-Z0-9]+/, "");

    // Split by whitespace, filter out empty strings and non-alphanumeric parts
    let nameParts = cleaned
      .split(/\s+/)
      .filter(part => part && /[a-zA-Z0-9]/.test(part));

    // If no valid parts, fallback to first two alphanumeric chars
    if (nameParts.length === 0) {
      let fallback = cleaned.replace(/[^a-zA-Z0-9]/g, "").slice(0, 2).toUpperCase();
      return fallback;
    }

    // Take first character of up to first two parts
    let initials = nameParts
      .slice(0, 2)
      .map(part => part.charAt(0).toUpperCase())
      .join("");

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
        <AvatarFallback  className={styles.avatarFallback} delayMs={5*100}>{getInitials(treeName)}</AvatarFallback>
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
