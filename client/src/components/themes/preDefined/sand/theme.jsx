// import Socials from "@/components/themes/themeComponents/socials/default/socials.jsx";
// import Background from "./background/background";
// import Links from "./links/links";
// import Pofile from "./profile/profile";
import styles from "./theme.module.css";

// import all from @/components/themes/themeComponents
import Socials from "@/components/themes/themeComponents/socials/default/socials.jsx";
import Background from "@/components/themes/themeComponents/background/background";
import Links from "@/components/themes/themeComponents/links/links";
import Pofile from "@/components/themes/themeComponents/profile/profile";
import Tree from "@/components/themes/themeComponents/tree/theme";

export default function TreeTheme({ tree }) {
  return (
    <Tree tree={tree} styles={styles} />
  );
}
