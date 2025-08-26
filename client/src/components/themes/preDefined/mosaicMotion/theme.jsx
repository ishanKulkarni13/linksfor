import Socials from "@/components/themes/preDefined/mosaicMotion/socials/default/socials";
import Background from "./background/background";
import Links from "./links/links";
import Pofile from "./profile/profile";
import styles from "./theme.module.css";

export default function TreeTheme({ tree }) {
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
              // tree?.theme?.themePreference?.socialIcons?.socialIconsPlacement &&
              tree?.theme?.themePreference?.socialIcons?.socialIconsPlacement ==
                "top"
                ? `column`
                : `column-reverse`,
              // background: 
              // tree?.theme?.themePreference?.socialIcons?.socialIconsPlacement &&
              // tree?.theme?.themePreference?.socialIcons?.socialIconsPlacement ==
              //   "top"
              //   ? `yellow`
              //   : `red`,
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
