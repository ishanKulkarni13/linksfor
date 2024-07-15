import React from "react";
import Link from "next/link";
import styles from "./socials.module.css";
import { SocialIcon } from "@/components/icons/social/socialIcon";

export default function Socials({ socials }) {
  return (
    <div className={styles.container}>
      {socials.map((social, index) => {
        return (
          <Link
            key={`social_${index}`}
            className={styles.social}
            href={social.URL}
          >
            <SocialIcon iconName={social.icon} />
          </Link>
        );
      })}
    </div>
  );
}


