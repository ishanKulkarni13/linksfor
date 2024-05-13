"use client";
import Image from "next/image";
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

export default function TreeProfileEditor() {
  const imageInputRef = useRef(null);
  const { push } = useRouter();
  const treeUID = useTreeUID();
  const { removeItem } = useLocalstorage("selectedTree");
  const [treeProfile, setTreeProfile] = useState({
    UID: "111111",
    treeVisibility: "public",
    treeLockConfig: { password: "1111" },
    treeName: "loadng",
    treePicture: {
      public_id: "",
      URL: "http://res.cloudinary.com/kakashib2k/image/upload/v1713685024/uiccf1wbzyioazqgve5q.png",
      style: "classic",
    },
    treeBio: "",
  });
  const [image, setImage] = useState(null);
  const [isReadyToUpdateImage, setIsReadyToUpdateImage] = useState(true);

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
        if (error.response.status === 404 || error.response.status === 400) {
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

  const handelImageInputChange = async (e) => {
    setImage(e.target.files[0]);
    setIsReadyToUpdateImage(true);
  };

  const updateImage = async (e) => {
    e.preventDefault();
    if (isReadyToUpdateImage) {
      const formData = new FormData();
      formData.append("treePicture", image);

      try {
        console.log(`the treeeeUId ids`, treeUID);
        toast.info("Updating Image...");
        const res = await axios.post(
          `${backendBaseURL}/tree/change-tree-picture/${treeUID}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
          }
        );
        toast.success(`updated image`);
        console.log("Image updated successfully");
        console.log(res.data);
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
    } else {
      toast.error("Select a new image to update");
    }
    // setIsReadyToUpdateImage(false)
  };

  useEffect(() => {
    getTreeProfile();
  }, [treeUID]);


  return (
    <>
      <p className={styles.title}>Profile</p>
      <div className={styles.container}>
        <form onSubmit={updateImage} className={styles.profileImageEditForm}>
          <div className={styles.profileImageContainer}>
            <Image
              fill={true}
              className={styles.profileImage}
              src={
                image
                  ? URL.createObjectURL(image)
                  : `${treeProfile.treePicture.URL}`
              }
              alt="Tree ImageTag"
              onClick={() => imageInputRef.current.click()}
            />
            <input
              type="file"
              ref={imageInputRef}
              accept="image/**"
              name="treePicture"
              style={{ display: "none" }}
              onChange={handelImageInputChange}
            />
          </div>
          <div className={styles.profileImageEditOptionsContainer}>
            {/* <button onClick={handleUploadImage}>Upload Image</button> */}
            <button className={styles.saveButton} type="submit">
              Upload
            </button>
          </div>
        </form>

        {/* <div className={styles.profileImageStyleContainer}>
        <p>Image Style</p>

        <div className={styles.profileImageStyleOptionsContainer}>
          <p>1</p>
          <p>2</p>
        </div>
      </div> */}

      <div className={styles.profileTitleAndBioContainer}>
       <EditTreeTitleAndBio treeUID={treeUID}/>
      </div>
      </div>
        <TreePreviewToggleButton/>
        <Toaster richColors={true} expand={true}  />
    </>
  );
}
