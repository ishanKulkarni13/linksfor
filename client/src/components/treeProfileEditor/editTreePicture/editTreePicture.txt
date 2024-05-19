import { backendBaseURL } from "@/constants";
import styles from "./editTreePicture.module.css"
import { useLocalstorage } from "@/hooks/localStorage";
import { useTreeUID } from "@/hooks/treeUID";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { toast } from "sonner";

export default function EditTreePicture({treeProfile, treeUID}) {
  const imageInputRef = useRef(null);
  const { push } = useRouter();
  const { removeItem } = useLocalstorage("selectedTree");
  const [image, setImage] = useState(null);
  const [isImageChanged, setIsImageChanged] = useState(true);

  const handelImageInputChange = async (e) => {
    setImage(e.target.files[0]);
    setIsImageChanged(true);
  };

  const updateImage = async (e) => {
    e.preventDefault();
    if (isImageChanged) {
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
    // setIsImageChanged(false)
  };

  return (
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
  );
}
