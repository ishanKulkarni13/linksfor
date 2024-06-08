import SelectTree from "@/components/selectTree/selectTree";
import styles from "./morePage.module.css";
import TopBar from "@/components/topbar/topBar";
import SettingLinks from "@/components/settings/settingLinks/settingLinks";
import { FiLayout } from "react-icons/fi";

export default function AdminMorePage() {
  const accountSettingLinks = [
    {
      title: "My Information",
      icon: FiLayout,
      path: "/admin/settings/admin-information",
      key: "information",
    },
    {
      title: "Privacy",
      icon: FiLayout,
      path: "/admin/settings/privacy",
      key: "privacy",
    },
    {
      title: "My trees",
      icon: FiLayout,
      path: "/admin/trees",
      key: "trees",
    },
    {
      title: "Delete Account",
      icon: FiLayout,
      path: "/admin/settings/delete-account",
      key: "deleteAccount",
    },
  ];

  const treeSettingLinks = [
    {
      title: "Social Icons",
      icon: FiLayout,
      path: "/admin/tree/edit/social-icons",
      key: "socialIcons",
    },
    {
      title: "SEO",
      icon: FiLayout,
      path: "/admin/tree/edit/SEO",
      key: "SEO",
    },
    {
      title: "Subscribers",
      icon: FiLayout,
      path: "/admin/tree/Subscribers",
      key: "subscribers",
    },
    {
      title: "Archives",
      icon: FiLayout,
      path: "/admin/tree/Archives",
      key: "Archives",
    },
  ];


  const signoutLink = [
    {
      title: "Signout",
      icon: FiLayout,
      path: "/admin/signout",
      key: "signout",
    },
  ];
  return (
    <>
      <TopBar />
      <div className={styles.container}>
        <div className={styles.selectTreeContainer}>
          <SelectTree />
        </div>

        <div className={styles.settingsContainer}>
          {/* <p className={styles.settingsTitle}>Settings</p> */}

          <div className={styles.settingLinksContainer}>
            <div className={styles.treeSettings}>
              <SettingLinks
                title={`Tree Settings`}
                settingLinks={treeSettingLinks}
              />
            </div>

            <div className={styles.accountSettings}>
              <SettingLinks
                title={`Account`}
                settingLinks={accountSettingLinks}
              />
            </div>

            <div className={styles.signout}>
              <SettingLinks settingLinks={signoutLink} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
