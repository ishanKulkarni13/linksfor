import BackgroundSpray from "./background/backgroundSpray";
import LinksSpray from "./links/links";
import PofileSpray from "./profile/profileSpray";
import styles from "./spray.module.css"

export default function TreeThemeSpray({ tree }) {
  return (
    <>
      <main className={`spray ${styles.spray}`}>
      <BackgroundSpray/>

        <div className={styles.profileContainer}>
          <PofileSpray
            treeName={tree.treeName}
            treePicture={tree.treePicture}
            treeBio={tree.treeBio}
          />
        </div>

        <div className={styles.linksContainer}>
          <LinksSpray links={ tree.treeContent.links }/>
        </div>

      </main>
    </>
  );
}
