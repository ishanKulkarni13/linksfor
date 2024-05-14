"use client";
import styles from "./treeProfileEditor.module.css";
import { useEffect, useRef, useState } from "react";
import { Toaster, toast } from "sonner";
import { backendBaseURL } from "@/constants";
import axios from "axios";
import { useLocalstorage } from "@/hooks/localStorage";
import { useTreeUID } from "@/hooks/treeUID";
import { useRouter } from "next/navigation";
import EditTreeTitleAndBio from "./editTreeTitleAndBio/editTreeTitleAndBio";
import TreePreviewToggleButton from "../treePreview/treePreviewToggleButton/treePreviewToggleButton";
import EditTreePicture from "./editTreePicture/editTreePicture";
import useWindowResize from "@/hooks/useWindowSize";

export default function TreeProfileEditor() {
  const [treeProfile, setTreeProfile] = useState(null);
  const [image, setImage] = useState(null);
  const [isImageChanged, setIsImageChanged] = useState(true);
  const imageInputRef = useRef(null);
  const { push } = useRouter();
  const { removeItem } = useLocalstorage("selectedTree");
  const {width , height} = useWindowResize();
  const treeUID = useTreeUID(null);

  const getTreeProfile = async () => {
    if (!treeUID) {
      console.log(treeUID);
      return toast.error("didn't got treeUID while getting treeprofile");
    }
    try {
      console.log(`got treeUId in getTreeProfile as:`, treeUID);
      const res = await axios.get(
        `${backendBaseURL}/tree/tree-profile/${treeUID}`,
        { withCredentials: true }
      );
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

  // const updateTitleAndBio = async () => {
  //   if (!treeUID) {
  //     console.log(treeUID);
  //     return toast.error("didn't got treeUID");
  //   }
  //   try {
  //     const res = await axios.post(
  //       `${backendBaseURL}/tree/edit-tree-profile/${treeUID}`,
  //       { treeName: treeProfile.treeName, treeBio: treeProfile.treeBio },
  //       { withCredentials: true }
  //     );
  //     let data = res.data.treeProfile;
  //   } catch (error) {
  //     console.log(error);
  //     if (error.response) {
  //       // if server responded
  //       toast.error(error.response.data.message);
  //       if (error.response.status === 404 || error.response.status === 400) {
  //         console.log(error.response);
  //         //   removeItem();
  //         //   return push("/admin/selectTree?removeSelectedTree");
  //       }
  //     } else if (error.request) {
  //       //req was made but go no response
  //       toast.error(`error occured`);
  //     } else {
  //       toast.error(`some error occured: ${error.message}`);
  //     }
  //   }
  // };

  useEffect(() => {
    if (treeUID) {
      getTreeProfile();
    }
  }, [treeUID]);

  return (
    <>
      {treeProfile ? (
        <>
          <p className={styles.title}>Profile</p>
          <div className={styles.container}>
            <div className={styles.editTreePictureContainer}>
              <EditTreePicture treeProfile={treeProfile} treeUID={treeUID} />
            </div>

            <div className={styles.profileTitleAndBioContainer}>
              <EditTreeTitleAndBio
                treeProfile={treeProfile}
                treeUID={treeUID}
              />
            </div>
          </div>
          {(width > 640) && (<TreePreviewToggleButton treeUID={treeUID} />)}
        </>
      ) : (
        <div>Loading...</div>
      )}
      <Toaster richColors={true} expand={true} />
    </>
  );
}
