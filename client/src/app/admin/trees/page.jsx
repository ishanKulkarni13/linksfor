import styles from "./style.module.css";
import { connectToDB } from "@/lib/DB/connectDB";
import { auth } from "@/auth";
import { Tree } from "@/lib/DB/models/tree";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import TreeActionButtons from "./components/treeActionButtons/treeActionButtons";

const getTrees = async () => {
  let trees;
  try {
    await connectToDB();
    const session = await auth();
    if (!session?.user) {
      return { error: "user not logged" };
    }
    let userID = session.user.id;

    trees = await Tree.find({ owner: userID });
    if (trees.length === 0) {
      return { error: "Trees not found" };
    }
    return { trees };
  } catch (error) {
    return { error: "Some error occured" };
  }
};

export default async function Page() {
  let {trees, error} = await getTrees();

  if(error){
    return <p>{error}</p>
  }

  return (
    <>
    <div className={styles.container}>
      <div className={styles.top}>
        <h1>Your all the Trees </h1>
      </div>

      <div className={styles.trees}>
        {trees &&
          trees.map((tree, index) => {
            return (
              <div key={`${index}`} className={styles.treeContainer}>
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
                  <div className={styles.treeInfoContainer}>
                    <h1 className={styles.treeName}>{tree.treeName}</h1>
                    <p className={styles.treeUID}>{tree.UID}</p>
                  </div>
                  
                </div>
                <div className={styles.treeActionsContainer}>
                  <TreeActionButtons treeUID={tree.UID} />
                </div>
              </div>
            );
          })}
      </div>
    </div>
    </>
  );
}
