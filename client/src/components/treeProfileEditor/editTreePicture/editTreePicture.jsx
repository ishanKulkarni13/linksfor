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

export default function EditTreePicture({ treeProfile,setTreeProfile, treeUID }) {
  const imageInputRef = useRef(null);
  const { push } = useRouter();
  const { removeItem } = useLocalstorage("selectedTree");
  const [image, setImage] = useState(null);
  const [isImageChanged, setIsImageChanged] = useState(true);
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

  const updateTreeProfilePicture = async (URL) => {
    if (!treeUID) {
      console.log(treeUID);
      return toast.error("didn't got treeUID");
    }
    try {
      const res = await axios.post(
        `/api/tree/edit/profile/${treeUID}`,
        { profilePicturePublicUrl: URL },
        { withCredentials: true }
      );
      const updatedImageURL = res.data.treeProfile.profilePicturePublicUrl;
      setTreeProfile({
        ...treeProfile,
        treePicture: {
          ...treeProfile.treePicture,
          URL: updatedImageURL
        }
      });
      // setTreeProfile(...treeProfile, treePicture = {...treeProfile.treePicture, URL:updatedImageURL} )
      console.log(treeProfile);
      toast.success("updated picture");
    } catch (error) {
      console.log(error);
      if (error.response) {
        // if server responded
        toast.error(error.response.data.message);
        if (error.response.status === 404 || error.response.status === 400) {
          console.log(error.response);
          //   removeItem();
          //   return push("/admin/selectTree?removeSelectedTree");
        }
      } else if (error.request) {
        //req was made but go no response
        toast.error(`error occured`);
      } else {
        toast.error(`some error occured: ${error.message}`);
      }
    }
  };

  return (
    <div  className={styles.profileImageEditContainer}>
      <div className={styles.profileImageContainer}>
        <Image
          fill={true}
          className={styles.profileImage}
          src={`${treeProfile.treePicture.URL}` }
          alt="user tree image"
          // onClick={() => imageInputRef.current.click()}
        />
        {/* <input
          type="file"
          ref={imageInputRef}
          accept="image/**"
          name="treePicture"
          style={{ display: "none" }}
          onChange={handelImageInputChange}
        /> */}
      </div>
      <div className={styles.profileImageEditOptionsContainer}>
        {/* Upload image button */}
        <CldUploadWidget
          options={{
            // sources: ["local", "url", "unsplash"],
            sources: ["local", 'unsplash'],
            // uploadPreset: uploadPreset,
            cropping: true, //add a cropping step
            multiple: false, //restrict upload to a single file
            // folder: "user_images", //upload files to the specified folder
            tags: ["user", "tree", "treePicture", "linksFor"], //add the given tags to the uploaded files
            // context: {alt: "user_uploaded"}, //add the given context data to the uploaded files
            // clientAllowedFormats: ["images"], //restrict uploading to image files only
            maxImageFileSize: 2000000, //restrict file size to less than 2MB
            maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
            theme: "custom", //change to a purple theme

            styles: {
              palette: {
                // 2
                window: "#000000", // TOP AND BOTTOM PANEL
                sourceBg: "000000",
                windowBorder: "#FFFFFF", // bordre
                tabIcon: "#FFFFFF", //logoes
                inactiveTabIcon: "#FFFFFF",
                menuIcons: "#FFFFFF", // logo name and X
                link: "#FFFFFF",
                action: "#FFFFFF", // icons boxes next and crop
                error: "#cc0000",
                inProgress: "#0433ff",
                complete: "#339933",
                textDark: "#000000", // Access millions of images from Unsplash.
                textLight: "#fcfffd",
              },
            },
          }}
          signatureEndpoint="/api/cloudinary-sign"
          onSuccess={(result, { widget }) => {
            // setResource(result.info); // { public_id, secure_url, etc }
            console.log(result.info.secure_url);
            toast(result.info.secure_url);
            updateTreeProfilePicture(result.info.secure_url);
            widget.close();
          }}
        >
          {({ open }) => {
            function handleOnClick() {
              setResource(undefined);
              open();
            }
            return (
              <button
                className={styles.saveButton}
                onClick={handleOnClick}
              >
                Change Image
              </button>
            );
            // <button onClick={handleOnClick}>Upload an Image</button>;
          }}
        </CldUploadWidget>
      </div>
    </div>
  );

  // return (
  //   <>
  //     <CldUploadWidget
  //       options={{
  //         // sources: ["local", "url", "unsplash"],
  //         sources: ["local"],
  //         // uploadPreset: uploadPreset,
  //         cropping: true, //add a cropping step
  //         multiple: false, //restrict upload to a single file
  //         // folder: "user_images", //upload files to the specified folder
  //         tags: ["user", "tree", "treePicture", "linksFor"], //add the given tags to the uploaded files
  //         // context: {alt: "user_uploaded"}, //add the given context data to the uploaded files
  //         // clientAllowedFormats: ["images"], //restrict uploading to image files only
  //         maxImageFileSize: 2000000, //restrict file size to less than 2MB
  //         maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
  //         theme: "custom", //change to a purple theme

  //         styles: {
  //           palette: {
  //             // 2
  //             window: "#000000", // TOP AND BOTTOM PANEL
  //             sourceBg: "000000",
  //             windowBorder: "#FFFFFF", // bordre
  //             tabIcon: "#FFFFFF", //logoes
  //             inactiveTabIcon: "#FFFFFF",
  //             menuIcons: "#FFFFFF", // logo name and X
  //             link: "#FFFFFF",
  //             action: "#FFFFFF", // icons boxes next and crop
  //             error: "#cc0000",
  //             inProgress: "#0433ff",
  //             complete: "#339933",
  //             textDark: "#000000", // Access millions of images from Unsplash.
  //             textLight: "#fcfffd",
  //           },
  //         },
  //       }}
  //       signatureEndpoint="/api/cloudinary-sign"
  //       onSuccess={(result, { widget }) => {
  //         // setResource(result.info); // { public_id, secure_url, etc }
  //         console.log(result.info.secure_url);
  //         toast(result.info.secure_url);
  //         updateTreeProfilePicture(result.info.secure_url);
  //         widget.close();
  //       }}
  //     >
  //       {({ open }) => {
  //         function handleOnClick() {
  //           setResource(undefined);
  //           open();
  //         }
  //         return (
  //           <button
  //             className={styles.saveButton}
  //             onClick={handleOnClick}
  //             type="submit"
  //           >
  //             Change Image
  //           </button>
  //         );
  //         // <button onClick={handleOnClick}>Upload an Image</button>;
  //       }}
  //     </CldUploadWidget>
  //   </>
  // );
}
