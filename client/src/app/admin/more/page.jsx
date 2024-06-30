import SelectTree from "@/components/selectTree/selectTree";
import styles from "./morePage.module.css";
import TopBar from "@/components/topbar/topBar";
import SettingLinks from "@/components/settings/settingLinks/settingLinks";
import { FiLayout, FiInstagram } from "react-icons/fi";

import { RiArchiveStackLine} from "react-icons/ri";
import { IoIosSearch} from "react-icons/io";
import { IoMailUnreadOutline } from "react-icons/io5";
import { PiSignOut } from "react-icons/pi";
import { LuTreePine } from "react-icons/lu";
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineAccountBox } from "react-icons/md";

export default function AdminMorePage() {
  const accountSettingLinks = [
    {
      title: "My Information",
      icon: MdOutlineAccountBox,
      path: "/admin/account",
      key: "information",
    },
    // {
    //   title: "Privacy",
    //   icon: FiLayout,
    //   path: "/admin/settings/privacy",
    //   key: "privacy",
    // },
    {
      title: "My trees",
      icon: LuTreePine,
      path: "/admin/trees",
      key: "trees",
    },
    // {
    //   title: "Delete Account",
    //   icon: AiOutlineDelete,
    //   path: "/admin/settings/delete-account",
    //   key: "deleteAccount",
    // },
  ];

  const treeSettingLinks = [
    {
      title: "Social Icons",
      icon: FiInstagram,
      path: "/admin/tree/edit/social-icons",
      key: "socialIcons",
    },
    {
      title: "SEO",
      icon: IoIosSearch,
      path: "/admin/tree/edit/SEO",
      key: "SEO",
    },
    {
      title: "Subscribers",
      icon: IoMailUnreadOutline,
      path: "/admin/tree/Subscribers",
      key: "subscribers",
    },
    {
      title: "Archives",
      icon: RiArchiveStackLine,
      path: "/admin/tree/Archives",
      key: "Archives",
    },
    {
      title: "Delete Tree",
      icon: AiOutlineDelete,
      path: "/admin/trees",
      key: "deleteTree",
    },
  ];


  const signoutLink = [
    {
      title: "Signout",
      icon: PiSignOut,
      path: "/signout",
      key: "signout",
    },
  ];
  return (
    
    <div className={styles.PageWrapper}>

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
      </div>
  );
}
