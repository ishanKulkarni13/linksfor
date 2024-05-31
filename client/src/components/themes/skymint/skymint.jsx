import BackgroundSkymint from "./background/background";
import LinksSkymint from "./links/linksSkymint";
import PofileSkymint from "./profile/profile";
import styles from "./skymint.module.css"

export default function TreeThemeSkymint({ tree }) {
  return (
    <>
      <main className={`spray ${styles.spray}`}>
      <BackgroundSkymint/>
    
        <div className={styles.profileContainer}>
          <PofileSkymint
            treeName={tree.treeName}
            treePicture={tree.treePicture}
            treeBio={tree.treeBio}
          />
        </div>

        <div className={styles.linksContainer}>
          <LinksSkymint links={ tree.treeContent.links }/>
        </div>

      </main>
    </>
  );
}
