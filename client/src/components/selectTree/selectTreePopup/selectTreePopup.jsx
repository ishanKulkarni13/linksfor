import Popup from "@/components/popup/popup";
import styles from "./selectTreePopup.module.css";
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import axios from "axios";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useSelectTree } from "@/hooks/selectTree";
import { useRouter } from "next/navigation";

export default function SelectTreePopup({
  close,
  selectedTreeProfile,
  setSelectedTreeProfile,
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [trees, setTrees] = useState([]);
  const { push } = useRouter();
  const select = useSelectTree();
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

  const selectTree = async (treeUID) => {
    const selectedTree = trees.find((tree) => tree.UID === treeUID);
    if (selectedTree) {
      setSelectedTreeProfile(selectedTree);
      select(treeUID);
      push(`/admin/tree/edit/links`);
      close();
    } else {
      toast.error(`Tree with UID ${treeUID} not found`);
    }
  };
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
                      className={`${styles.treeContainer} ${
                        tree.UID == selectedTreeProfile.UID
                          ? `${styles.selected}`
                          : `notSelected`
                      }`}
                    >
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

                      <div className={styles.iconContainer}>
                        {tree.UID == selectedTreeProfile.UID && (
                          <FontAwesomeIcon icon={faCheck} />
                        )}
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
