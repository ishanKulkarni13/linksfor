import styles from './style.module.css'

export default function Page() {
  return (
    <div>
      <div className={styles.treeProfileContainer}>
        <div className={styles.treeImageContainer}>
          {tree.treePicture && tree.treePicture.URL ? (
            <>
              <span>Loading</span>
              <Image
                fill={true}
                className={styles.profileImage}
                src={`${tree.treePicture.URL}`}
                alt="Tree Image"
              />
            </>
          ) : (
            <span>NA</span>
          )}
        </div>
        <div className={styles.treeTextContainer}>
          <h1 className={styles.treeName}>{tree.treeName}</h1>
          <p className={styles.treeUID}>{tree.UID}</p>
        </div>
      </div>
    </div>
  );
}
