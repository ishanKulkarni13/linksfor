"use client";
import Image from "next/image";
import styles from "./treeProfileEditor.module.css";
import { useRef, useState } from "react";
import { Toaster, toast } from "sonner";
import { backendBaseURL } from "@/constants";
import axios from "axios";
import { useLocalstorage } from "@/hooks/localStorage";

export default function TreeProfileEditor() {
  const imageInputRef = useRef(null);
  const { setItem, getItem , removeItem} = useLocalstorage(`selectedTree`);
  const [treeUID, setTreeUID] = useState(null)
  const [image, setImage] = useState(null);
  const [isReadyToUpdateImage, setIsReadyToUpdateImage] = useState(true);

  const getDefaultTreeUID = async ()=>{
    try {
      let res = await fetch(
        `${backendBaseURL}/tree/user-default-treeUID`,
        {
          method: "GET",
          cache: "no-store",
          credentials: "include",
          headers: {
            Accept: "applications/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          },
        }
      );
      if (res.ok) {
        let responseData = await res.json();
        return { success: true, error: false, response: responseData, statusCode: res.status };
      } else {
        let responseData = await res.json();
        return { success: false, error: false, response: responseData, statusCode: res.status };
      }
    } catch (error) {
      return { success: false, error: error, response: error};
    }
  }

  const updateTreeUID = async () => {
    let UID = getItem();

    if (!UID) {
      let { success, response, error, statusCode } = await getDefaultTreeUID();
      if (success) {
        console.log('got treeUID', response.treeUID);
        UID = response.treeUID;
      } else{
        if (error) {
          // if catched error in fetch
          console.log("Some error occured", error);
          toast.error(`Some error occured: ${error.message}`)
        } else{
          //no error in fetch and success is false(from server)
          toast.error(`${response.message}`)
          if(statusCode === 404){
            removeItem()
           return  push("/admin/selectTree?removeSelectedTree")
          }
          console.log("cant get treEUID", response.message );

        }
      }
      console.log("setting selected tree cookie as no tree was selected");
      setItem(UID);
    }

    setTreeUID(UID)
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
        console.log(error)
        if (error.response) {
            // if server responded
          toast.error(error.response.data.message);
        } else if(error.request){
            //req was made but go no response
            toast.error(`error occured`);
        } else{
            toast.error(`some error occured: ${error.message}`);
        }
      }
    } else {
      toast.error("Select a new image to update");
    }
    // setIsReadyToUpdateImage(false)
  };

  useState(()=>updateTreeUID(), [])

  return (
    <div className={styles.container}>
      <form onSubmit={updateImage} className={styles.profileImageEditForm}>
        <div className={styles.profileImageContainer}>
          <Image
            fill={true}
            className={styles.profileImage}
            src={
              image
                ? URL.createObjectURL(image)
                : "http://res.cloudinary.com/kakashib2k/image/upload/v1713685024/uiccf1wbzyioazqgve5q.png"
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
            Save
          </button>
        </div>
      </form>

      {/* <div className={styles.profileImageStyleContainer}>
        <p>Image Style</p>

        <div className={styles.profileImageStyleOptionsContainer}>
          <p>1</p>
          <p>2</p>
        </div>
      </div>

      <div className={styles.profileTitleAndBioContainer}>
        <form>
          <input type="text" placeholder="Profile TItle" />
          <input type="text" placeholder="Bio" />
        </form>
      </div> */}
      <Toaster richColors={true} />
    </div>
  );
}
