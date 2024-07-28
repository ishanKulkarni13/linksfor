import Socials from "@/components/themes/themeComponents/socials/default/socials.jsx";
import BackgroundSkymint from "./background/background";
import LinksSkymint from "./links/linksSkymint";
import PofileSkymint from "./profile/profile";
import styles from "./skymint.module.css";

export default function TreeThemeSkymint({ tree }) {
  console.log(tree?.theme?.themePreference?.socialIcons?.socialIconsPlacement);
  return (
    <>
      <main className={`${styles.skyMint}`}>
        <BackgroundSkymint />

        <div className={styles.profileContainer}>
          <PofileSkymint
            treeName={tree.treeName}
            treePicture={tree.treePicture}
            treeBio={tree.treeBio}
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
            <LinksSkymint links={tree.treeContent.links} />
          </div>
        </div>
      </main>
    </>
  );
}
