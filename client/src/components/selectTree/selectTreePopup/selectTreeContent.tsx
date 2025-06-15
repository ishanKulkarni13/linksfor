"use client";

import Popup from "@/components/popup/popup";
import styles from "./selectTreeContent.module.css";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import Image from "next/image";
import { useSelectTree } from "@/hooks/selectTree";
import { useRouter, useSearchParams } from "next/navigation";
import AdaptiveDrawer from "@/components/adaptiveDrawer/adaptiveDrawer";
import { Skeleton } from "@/components/ui/skeleton";
import { useLocalstorage } from "@/hooks/localStorage";
import { TreeDocType } from "@/types";


// interface TreeType {
//   UID: string;
//   treeName: string;
//   treePicture?: {
//     URL?: string;
//     public_id?: string;
//   };
//   // Only allow string values for unknown props (if really needed)
//   [key: string]: string | number | object | undefined;
// }


interface SelectTreeContentProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedTreeProfile?: TreeDocType | null;
  setSelectedTreeProfile?: (tree: TreeDocType) => void;
}

// Extracted content for reuse
export function SelectTreeContent({
  open,
  setOpen,
  selectedTreeProfile,
  setSelectedTreeProfile,
}: SelectTreeContentProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [trees, setTrees] = useState<TreeDocType[]>([]);
  const { push } = useRouter();
  const select = useSelectTree();
  const { removeItem } = useLocalstorage("selectedTree");
  const searchParams = useSearchParams();

  useEffect(() => {
    // Remove selected tree if URL has removeSelectedTree or unselecttree param
    if (
      searchParams.get("removeSelectedTree") !== null ||
      searchParams.get("unselecttree") !== null
    ) {
      removeItem();
    }
  }, [searchParams, removeItem]);

  const getTrees = async () => {
    try {
      const res = await axios.get<{ trees: TreeDocType[] }>(`/api/tree/admin/trees`, {
        withCredentials: true,
      });
      if (!res.data.trees || res.data.trees.length === 0) {
        toast.error("No trees found");
        setIsLoading(false);
        return;
      };
      setTrees(res.data.trees);
     
      setIsLoading(false);
    } catch (error: any) {
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

  const selectTree = async (treeUID: string) => {
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
    <div
      className={styles.treesContainer}
      style={{
        height: isLoading ? "20vh" : `${trees.length * 90 + 8}px`,
        overflowY: isLoading ? "hidden" : "auto",
        overflowX: "hidden",
      }}
    >
      {isLoading ? (
        <>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, idx) => (
            <Skeleton key={idx} className={`${styles.treeContainer} `}>
              <Skeleton className={styles.treeProfileContainer}>
                <Skeleton className={styles.treeImageContainer}>
                  <Skeleton className={styles.profileImage} />
                </Skeleton>
                <Skeleton className={styles.treeTextContainer}>
                  <Skeleton
                    className={`${styles.treeName} h-3 bg-[var(--color-surface-2)] w-32 mb-2`}
                  />
                  <Skeleton
                    className={`${styles.treeName} h-3 bg-[var(--color-surface-2)] w-40`}
                  />
                </Skeleton>
              </Skeleton>
            </Skeleton>
          ))}
        </>
      ) : (
        <>
          {trees.map((tree) => (
            <button
              key={tree.UID}
              onClick={() => selectTree(tree.UID)}
              className={`${styles.treeContainer} ${
                selectedTreeProfile && tree.UID == selectedTreeProfile?.UID
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
          ))}
        </>
      )}
    </div>
  );
}

// Remove AdaptiveDrawer and use only for legacy fallback
export default function SelectTreePopup(props: any) {
  // Legacy fallback, not used in new implementation
  return null;
}
