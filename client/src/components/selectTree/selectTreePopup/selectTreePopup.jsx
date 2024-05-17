import Popup from "@/components/popup/popup";
import styles from "./selectTreePopup.module.css";
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import axios from "axios";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export default function SelectTreePopup({ close, selectedTreeUID }) {
  const [isLoading, setIsLoading] = useState(true);
  const [trees, setTrees] = useState([
    // {
    //   treePicture: { style: 'classic' },
    //   treeVisibility: 'public',
    //   treeName: '@zxcvbnm',
    //   UID: '2393290459',
    //   treeBio: 'hi thereee'
    // }
  ]);
  // selectedTreeUID = `2393290459` // temppppppppp
  const getTrees = async () => {
    try {
      const res = await axios.get(`/api/tree/admin/trees`, {
        withCredentials: true,
      });
      setTrees(res.data.trees);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      if (error.response) {
        // if server responded
        toast.error(error.response.data.message);
      } else if (error.request) {
        //req was made but go no response
        toast.error(`error occured`);
      } else {
        toast.error(`some error occured: ${error.message}`);
      }
    }
  };

  const selectTree = async (treeUID)=>{
    toast.info(treeUID)
    close()
  }
  useEffect(() => {
    getTrees();
  }, []);

  return (
    <>
      <Popup title={`Select Tree`} close={close}>
        {isLoading ? (
          <>Loading your Trees</>
        ) : (
          <>
            <div className={styles.treesContainer}>
              {trees.map((tree) => {
                return (
                  <>
                    <button
                      onClick={(e) => {
                        selectTree(tree.UID);
                      }}
                      className={`${styles.treeContainer} ${ (tree.UID == selectedTreeUID)? `${styles.selected}`: `notSelected`}`}
                    >
                      <div className={styles.treeProfileContainer}>
                        <div className={styles.treeImageContainer}>
                          <Image
                            fill={true}
                            className={styles.profileImage}
                            //   src={`${treeProfile.treePicture.URL}`}
                            src={`http://res.cloudinary.com/kakashib2k/image/upload/v1713685024/uiccf1wbzyioazqgve5q.png`}
                            alt="Tree Image"
                          />
                        </div>
                        <div className={styles.treeTextContainer}>
                          <h1 className={styles.treeName}>{tree.treeName}</h1>
                          <p className={styles.treeUID}>{tree.UID}</p>
                        </div>
                      </div>

                      <div className={styles.iconContainer} >
                       {
                        (tree.UID == selectedTreeUID) &&  <FontAwesomeIcon icon={faCheck} />
                       }
                      </div>
                    </button>

                    {/* ggg */}
                    <button
                      onClick={(e) => {
                        selectTree(tree.UID);
                      }}
                      className={styles.treeContainer}
                    >
                      <div className={styles.treeProfileContainer}>
                        <div className={styles.treeImageContainer}>
                          <Image
                            fill={true}
                            className={styles.profileImage}
                            //   src={`${treeProfile.treePicture.URL}`}
                            src={`http://res.cloudinary.com/kakashib2k/image/upload/v1713685024/uiccf1wbzyioazqgve5q.png`}
                            alt="Tree Image"
                          />
                        </div>
                        <div className={styles.treeTextContainer}>
                          <h1 className={styles.treeName}>{`treeName`}</h1>
                          <p className={styles.treeUID}>{`treeProfile.UID`}</p>
                        </div>
                      </div>
                    </button>

                    {/* ggg */}
                    <button
                      onClick={(e) => {
                        selectTree(tree.UID);
                      }}
                      className={styles.treeContainer}
                    >
                      <div className={styles.treeProfileContainer}>
                        <div className={styles.treeImageContainer}>
                          <Image
                            fill={true}
                            className={styles.profileImage}
                            //   src={`${treeProfile.treePicture.URL}`}
                            src={`http://res.cloudinary.com/kakashib2k/image/upload/v1713685024/uiccf1wbzyioazqgve5q.png`}
                            alt="Tree Image"
                          />
                        </div>
                        <div className={styles.treeTextContainer}>
                          <h1 className={styles.treeName}>{`treeName`}</h1>
                          <p className={styles.treeUID}>{`treeProfile.UID`}</p>
                        </div>
                      </div>
                    </button>
                  </>
                );
              })}
            </div>
          </>
        )}
      </Popup>
      <Toaster richColors position="bottom" />
    </>
  );
}
