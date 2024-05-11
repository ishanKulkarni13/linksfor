import styles from "./airBlack.module.css";
import BackgroundAirBlack from "./background/backgroundAirBlack";
import LinksAirblack from "./links/linksAirblack";
import PofileAirblack from "./profile/profileAirblack";

export default function TreeThemeAirBlack({ tree }) {
  
  return (
    <>
      <BackgroundAirBlack />
      <main className={styles.container}>

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

      </main>
    </>
  );
}
