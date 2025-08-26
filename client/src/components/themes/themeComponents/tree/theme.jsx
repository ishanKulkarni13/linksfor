// import Socials from "@/components/themes/themeComponents/socials/default/socials.jsx";
// import Background from "./background/background";
// import Links from "./links/links";
// import Pofile from "./profile/profile";
// import styles from "./theme.module.css";

// import all from @/components/themes/themeComponents
import Socials from "@/components/themes/themeComponents/socials/default/socials.jsx";
import Background from "@/components/themes/themeComponents/background/background";
import Links from "@/components/themes/themeComponents/links/links";
import Pofile from "@/components/themes/themeComponents/profile/profile";

export default function Tree({ tree, styles }) {
  return (
    <>
      <Background />
      <main className={` ${styles.treeContainer}`}>
        <div className={styles.profileContainer}>
          <Pofile
            treeName={tree.treeName}
            treePicture={tree.treePicture}
            treeBio={tree.treeBio}
            isVerified={tree.verified.status}
          />
        </div>

        <div
          className={styles.treeContentContainer}
          style={{
            flexDirection:
              tree?.theme?.themePreference?.socialIcons?.socialIconsPlacement ==
              "top"
                ? `column`
                : `column-reverse`,
          }}
        >
          <div className={styles.socialsContainer}>
            <Socials socials={tree.treeContent.socials} />
          </div>

          <div className={styles.linksContainer}>
            <Links links={tree.treeContent.links} />
          </div>
        </div>
      </main>
    </>
  );
}
