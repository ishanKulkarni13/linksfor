import BackgroundGreenFog from "./background/background";
import styles from "./greenFog.module.css"
import LinksGreenFog from "./links/linksSkymint";
import PofileGreenFog from "./profile/profile";

export default function TreeThemeGreenFog({ tree }) {
  return (
    <>
      <main className={`spray ${styles.spray}`}>
      <BackgroundGreenFog/>
    
        <div className={styles.profileContainer}>
          <PofileGreenFog
            treeName={tree.treeName}
            treePicture={tree.treePicture}
            treeBio={tree.treeBio}
          />
        </div>

        <div className={styles.linksContainer}>
          <LinksGreenFog links={ tree.treeContent.links }/>
        </div>

      </main>
    </>
  );
}
