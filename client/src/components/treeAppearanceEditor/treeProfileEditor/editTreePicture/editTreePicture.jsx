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

export default function EditTreePicture({
  treeProfile,
  setTreeProfile,
  treeUID,
}) {
  const [resource, setResource] = useState();

  

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
          URL: updatedImageURL,
        },
      });
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
    <div className={styles.profileImageEditContainer}>
      <div className={styles.profileImageContainer}>
        <span>NA</span>
        {treeProfile.treePicture.URL && (
          <Image
          fill={true}
          // objectFit="cover"
          // objectPosition="centre"
          className={styles.profileImage}
          src={`${treeProfile.treePicture.URL}`}
          alt="user tree image"
          // onClick={() => imageInputRef.current.click()}
        />
        )}
        
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
            sources: ["local", "unsplash"],
            uploadPreset: 'links_profile_photo',
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
                window: "hsl(222.2, 84%, 4.9%)", // TOP AND BOTTOM PANEL
                sourceBg: "hsl(222.2, 70%, 10%)",
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
              <button className={styles.saveButton} onClick={handleOnClick}>
                Change Image
              </button>
            );
            // <button onClick={handleOnClick}>Upload an Image</button>;
          }}
        </CldUploadWidget>
      </div>
    </div>
  );

}
