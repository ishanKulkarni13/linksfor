"use client";
import { useTreeUID } from "@/hooks/treeUID";
import styles from "./treeAppearanceEditor.module.css";
import dynamic from "next/dynamic";
import useWindowResize from "@/hooks/useWindowSize";
import { useLocalstorage } from "@/hooks/localStorage";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import TreePreviewToggleButton from "../treePreview/treePreviewToggleButton/treePreviewToggleButton";

const DynamicTreeProfileEditor = dynamic(
  () =>
    import(
      "@/components/treeAppearanceEditor/treeProfileEditor/treeProfileEditor"
    ),
  {
    loading: () => (
      <div className={styles.dynamicContainer}>
        {" "}
        <p>Loading Profile Editor</p>{" "}
      </div>
    ),
    ssr: false,
  }
);

const DynamicTreeThemeEditor = dynamic(
  () => import("@/components/treeAppearanceEditor/editTreeTheme/editTreeTheme"),
  {
    loading: () => (
      <div className={styles.dynamicContainer}>
        {" "}
        <p>Loading theme Editor</p>{" "}
      </div>
    ),
    ssr: false,
  }
);

export default function TreeAppearanceEditor() {
  const [treeProfile, setTreeProfile] = useState(null);
  const { push } = useRouter();
  const { removeItem } = useLocalstorage("selectedTree");
  const { width } = useWindowResize();
  const treeUID = useTreeUID(null);

  const getTreeProfile = async () => {
    if (!treeUID) {
      console.log(treeUID);
      return toast.error("didn't got treeUID while getting treeprofile");
    }
    try {
      console.log(`got treeUId in getTreeProfile as:`, treeUID);
      const res = await axios.get(`/api/tree/profile/${treeUID}`, {
        withCredentials: true,
      });
      let treeProfile = res.data.treeProfile;
      setTreeProfile(treeProfile);
    } catch (error) {
      console.log(error);
      if (error.response) {
        // if server responded
        toast.error(error.response.data.message);
        if (error.response.status === 404 || error.response.status === 401) {
          removeItem();
          return push("/admin/selectTree?removeSelectedTree");
        }
      } else if (error.request) {
        //req was made but go no response
        toast.error(`error occured`);
      } else {
        toast.error(`some error occured: ${error.message}`);
      }
    }
  };

  useEffect(() => {
    if (treeUID) {
      getTreeProfile();
    }
  }, [treeUID]);

  return (
    <>
      {treeProfile ? (
        <>
          {" "}
          <main className={styles.container}>
            <div className={styles.profileEditorContainer}>
              <DynamicTreeProfileEditor />
            </div>
            <div className={styles.profileThemeEditorContainer}>
              <DynamicTreeThemeEditor treeUID={treeUID} treeProfile={treeProfile} />
            </div>
          </main>
          <TreePreviewToggleButton treeUID={treeUID} alwaysVisible = {true} />
        </>
      ) : (
        <>
        <div className={styles.loadingContainer} ></div>
          <p>Loading Data...</p>{" "}
        </>
      )}
    </>
  );
}
