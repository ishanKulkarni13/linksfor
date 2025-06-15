import Link from "next/link";
import styles from "./settingLinks.module.css";
import { IconType } from "react-icons";
import { Separator } from "@/components/ui/separator";

// Define the type for a single setting link
export interface SettingLink {
  title: string;
  icon: IconType;
  path: string;
  key: string;
}

// Define the props for the SettingLinks component
export interface SettingLinksProps {
  title?: string;
  settingLinks: SettingLink[];
}

export default function SettingLinks({ title, settingLinks }: SettingLinksProps) {
  return (
    <div className={styles.container}>
      {title && <p className={styles.title}>{title}</p>}
      <div className={styles.accountSettingsContainer}>
        {settingLinks.map((setting) => (
          <div key={setting.key} className={styles.accountSetting}>
            <Link
              href={setting.path}
              className={`${styles.link} ${
                setting.title.toLowerCase().includes("delete") ? styles.delete : ""
              }`}
            >
              <span className={styles.icon}>
                <setting.icon />
              </span>
              <p className={styles.settingTitle}>{setting.title}</p>
            </Link>
            <Separator className={`${styles.separator}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
