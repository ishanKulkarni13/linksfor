import Link from "next/link";
import styles from "./socials.module.css";

// icons
import { BsTelegram } from "react-icons/bs";

export default function Socials({ socials }) {
  return (
    <div className={styles.container}>
      {socials.map((social, index) => {
        return (
            <Link key={`social_${index}`} className={styles.social} href={social.URL} >
              <SocialIcon iconName={social.icon} />
            </Link>
        );
      })}
    </div>
  );
}

function SocialIcon({ iconName }) {
  return <BsTelegram />;
}
