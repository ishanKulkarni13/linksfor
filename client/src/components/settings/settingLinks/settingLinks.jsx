import Link from "next/link";
import styles from "./settingLinks.module.css";
import { FiLayout } from "react-icons/fi";
import { Separator } from "@/components/ui/separator";

export default function SettingLinks({ title, settingLinks }) {
  return (
    <div className={styles.container}>
      {title && <p className={styles.title}>{title}</p>}
      <div className={styles.accountSettingsContainer}>
        {settingLinks.map((setting) => {
          return (
            <div key={setting.key} className={styles.accountSetting}>
              <Link href={setting.path} className={styles.link}>
                <span className={styles.icon}>
                  {" "}
                  <setting.icon />
                </span>
                <p className={styles.settingTitle}>{setting.title}</p>
              </Link>
              <Separator className={styles.separator} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
