"use client";

import Popup from "@/components/popup/popup";
import styles from "./selectTreePopup.module.css";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import Image from "next/image";
import { useSelectTree } from "@/hooks/selectTree";
import { useRouter } from "next/navigation";
import AdaptiveDrawer from "@/components/adaptiveDrawer/adaptiveDrawer";
import { Skeleton } from "@/components/ui/skeleton";

export default function SelectTreePopup({
  open,
  setOpen,
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
      setSelectedTreeProfile && setSelectedTreeProfile(selectedTree);
      select(treeUID);
      toast.success("Tree selected, ", {
        id: "selectTree",
        description: "redirecting...",
      });
      push(`/admin/tree/edit/links`);
      setOpen && setOpen(false);
    } else {
      toast.error(`Tree with UID ${treeUID} not found`, {
        id: "selectTree",
      });
    }
  };
  useEffect(() => {
    getTrees();
  }, []);

  return (
    <>
      <AdaptiveDrawer
        heading={`Select tree`}
        open={open}
        onOpenChange={setOpen}
      >
          <div className={styles.treesContainer} style={{ height: isLoading?'20vh':`${trees.length * 90 + 8}px` }} >
        {isLoading || false ? (
          <>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => {
              return (
                <>
                  <Skeleton className={`${styles.treeContainer} `}>
                    <Skeleton className={styles.treeProfileContainer}>
                      <Skeleton className={styles.treeImageContainer}>
                        <Skeleton
                          fill={true}
                          className={styles.profileImage}
                          alt="Tree Image"
                        ></Skeleton>
                      </Skeleton>
                      <Skeleton className={styles.treeTextContainer}>
                        <Skeleton
                          className={`${styles.treeName} h-3 bg-[var(--color-surface-2)] w-32 mb-2`}
                        ></Skeleton>
                        <Skeleton
                          className={`${styles.treeName} h-3 bg-[var(--color-surface-2)] w-40`}
                        ></Skeleton>
                      </Skeleton>
                    </Skeleton>
                  </Skeleton>
                </>
              );
            })}
          </>
        ) : (
          <>
           <>
              {trees.map((tree) => {
                return (
                  <>
                    <button
                      onClick={(e) => {
                        selectTree(tree.UID);
                      }}
                      className={`${styles.treeContainer} ${
                        selectedTreeProfile &&
                        tree.UID == selectedTreeProfile?.UID
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
                    </button>
                  </>
                );
              })}
            </>
          </>
        )}

       </div>
      </AdaptiveDrawer>
    </>
  );
}
