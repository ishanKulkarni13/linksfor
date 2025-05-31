import styles from "./airBlack.module.css";
import BackgroundAirBlack from "./background/backgroundAirBlack";
import LinksAirblack from "./links/linksAirblack";
import PofileAirblack from "./profile/profileAirblack";

export default function TreeThemeAirBlack({ tree }) {
  return (
    <main  className={styles.airBlack} >
      <BackgroundAirBlack />
      <div className={styles.content}>

        <div className={styles.profileContainer}>
          <PofileAirblack
            treeName={tree.treeName}
            treePicture={tree.treePicture}
            treeBio={tree.treeBio}
          />
        </div>

        <div className={styles.linksContainer}>
          <LinksAirblack links={ tree.treeContent.links }/>
        </div>

      </div>
    </main>
  );
}
