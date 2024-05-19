import { backendBaseURL } from "@/constants";
import styles from "./editTreePicture.module.css";
import { useLocalstorage } from "@/hooks/localStorage";
import { useTreeUID } from "@/hooks/treeUID";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { Toaster, toast } from "sonner";
import { CldUploadWidget } from "next-cloudinary";

export default function EditTreePicture({ treeProfile, treeUID }) {
  // const imageInputRef = useRef(null);
  // const { push } = useRouter();
  // const { removeItem } = useLocalstorage("selectedTree");
  // const [image, setImage] = useState(null);
  // const [isImageChanged, setIsImageChanged] = useState(true);
  const [resource, setResource] = useState();

  // const handelImageInputChange = async (e) => {
  //   setImage(e.target.files[0]);
  //   setIsImageChanged(true);
  // };

  // const updateImage = async (e) => {
  //   e.preventDefault();
  //   if (isImageChanged) {
  //     const formData = new FormData();
  //     formData.append("treePicture", image);

  //     try {
  //       console.log(`the treeeeUId ids`, treeUID);
  //       toast.info("Updating Image...");
  //       const res = await axios.post(
  //         `${backendBaseURL}/tree/change-tree-picture/${treeUID}`,
  //         formData,
  //         {
  //           headers: { "Content-Type": "multipart/form-data" },
  //           withCredentials: true,
  //         }
  //       );
  //       toast.success(`updated image`);
  //       console.log("Image updated successfully");
  //       console.log(res.data);
  //     } catch (error) {
  //       console.log(error);
  //       if (error.response) {
  //         // if server responded
  //         toast.error(error.response.data.message);
  //       } else if (error.request) {
  //         //req was made but go no response
  //         toast.error(`error occured`);
  //       } else {
  //         toast.error(`some error occured: ${error.message}`);
  //       }
  //     }
  //   } else {
  //     toast.error("Select a new image to update");
  //   }
  //   // setIsImageChanged(false)
  // };

  // return (
  //   <form onSubmit={updateImage} className={styles.profileImageEditForm}>
  //     <div className={styles.profileImageContainer}>
  //       <Image
  //         fill={true}
  //         className={styles.profileImage}
  //         src={
  //           image
  //             ? URL.createObjectURL(image)
  //             // : `${treeProfile.treePicture.URL}`
  //             : `https://res.cloudinary.com/kakashib2k/image/upload/v1715678326/ubvybrdexjldcmgqbryl.jpg`
  //         }
  //         alt="Tree ImageTag"
  //         onClick={() => imageInputRef.current.click()}
  //       />
  //       <input
  //         type="file"
  //         ref={imageInputRef}
  //         accept="image/**"
  //         name="treePicture"
  //         style={{ display: "none" }}
  //         onChange={handelImageInputChange}
  //       />
  //     </div>
  //     <div className={styles.profileImageEditOptionsContainer}>
  //       {/* <button onClick={handleUploadImage}>Upload Image</button> */}
  //       <button className={styles.saveButton} type="submit">
  //         Upload
  //       </button>
  //     </div>
  //   </form>
  // );

  return (
    <>
      <CldUploadWidget
        options={{
          sources: ["local", "url", "unsplash"],
          // uploadPreset: uploadPreset,
          cropping: true, //add a cropping step
          // showAdvancedOptions: true,  //add advanced options (public_id and tag)
          // sources: [ "local", "url"], // restrict the upload sources to URL and local files
          multiple: false, //restrict upload to a single file
          // folder: "user_images", //upload files to the specified folder
          // tags: ["users", "profile"], //add the given tags to the uploaded files
          // context: {alt: "user_uploaded"}, //add the given context data to the uploaded files
          // clientAllowedFormats: ["images"], //restrict uploading to image files only
          maxImageFileSize: 2000000,  //restrict file size to less than 2MB
          maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
          theme: "black", //change to a purple theme

          styles:{
            palette: { // 2
              window: "#fff", // TOP AND BOTTOM PANEL
              windowBorder: "#000", // bordre
              tabIcon: "#000", //logoes
              menuIcons: "#000", // logo name and X 
              // textDark: "#000", // Access millions of images from Unsplash.
              // textLight: "#fff", 
              link:  "#fff",
              // action:  "#212121", // icons boxes next and crop
              // inactiveTabIcon: "#212121",
              // error: "#F44235",
              // inProgress: "#fff",
              // complete: "#fff",
              // sourceBg: "fff"
            },
            // palette: {  //1
            //   window: "#000", // TOP AND BOTTOM PANEL
            //   windowBorder: "#fff", // bordre
            //   tabIcon: "#fff", //logoes
            //   menuIcons: "#fff", // logo name and X 
            //   textDark: "#000", // Access millions of images from Unsplash.
            //   textLight: "#fff", 
            //   link:  "#fff",
            //   action:  "#fff", // icons boxes next and crop
            //   inactiveTabIcon: "#FFF",
            //   error: "#F44235",
            //   inProgress: "#fff",
            //   complete: "#fff",
            //   sourceBg: "fff"
            // },
            // palette: {
            //   window: "#fff", // TOP AND BOTTOM PANEL
            //   windowBorder: "#000", // bordre
            //   tabIcon: "#000", //logoes
            //   menuIcons: "#000", // logo name and X 
            //   textDark: "#000", // Access millions of images from Unsplash.
            //   textLight: "#fff", 
            //   link:  "#212121",
            //   action:  "#212121", // icons boxes next and crop
            //   inactiveTabIcon: "#212121",
            //   error: "#F44235",
            //   inProgress: "#000",
            //   complete: "#fff",
            //   sourceBg: "000"
            // },
            // frame: {
            //   background: "#d606c8"
            // }
          

            //text-field search-input outline-0
          }
        }}

        signatureEndpoint="/api/cloudinary-sign"
        onSuccess={(result, { widget }) => {
          // setResource(result.info); // { public_id, secure_url, etc }
          console.log(result.info.secure_url);
          toast(result.info.secure_url);
          widget.close();
        }}
      >
        {({ open }) => {
          function handleOnClick() {
            setResource(undefined);
            open();
          }
          return <button onClick={handleOnClick}>Upload an Image</button>;
        }}
      </CldUploadWidget>
    </>
  );
}
