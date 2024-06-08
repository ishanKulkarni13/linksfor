import Link from "next/link";
import styles from "./accountSettings.module.css";
import { FiLayout } from "react-icons/fi";
import { Separator } from "@/components/ui/separator";

export default function SettingLinks({title, settingLinks}) {

  return (
    <div className={styles.container}>
      <p className={styles.title}>{title}</p>
      <div className={styles.accountSettingsContainer}>
      {settingLinks.map((setting) => {
        return (
          <div className={styles.accountSetting}>
            <Link
              href={setting.path}
              key={setting.key}
              className={styles.link}
            >
              <span className={styles.icon}>
                {" "}
                <FiLayout />{" "}
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
