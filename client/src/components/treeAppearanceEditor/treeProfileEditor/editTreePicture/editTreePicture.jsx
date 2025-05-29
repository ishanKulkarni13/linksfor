import { useLocalstorage } from "@/hooks/localStorage";
import { useTreeUID } from "@/hooks/treeUID";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import ReusableImageUploader from "@/components/imageUploader/reusableImageUploader";
import styles from "./editTreePicture.module.css";
import { thumbnailGallery } from "@/constants/thumbnailGallery";
import ChangePicButton from "./changePicContent";
import Image from "next/image";
import { useState } from "react";

export default function EditTreePicture({
  treeProfile,
  setTreeProfile,
  treeUID,
}) {
  const { removeItem } = useLocalstorage("selectedTree");
  const { push } = useRouter();
  

  // Handler for updating the profile picture
  const handleUpload = async (url) => {
    if (!treeUID) {
      toast.error("No treeUID found");
      return;
    }
    try {
      const res = await axios.post(
        `/api/tree/edit/profile/${treeUID}`,
        { profilePicturePublicUrl: url },
        { withCredentials: true }
      );
      const updatedImageURL = res.data.treeProfile.profilePicturePublicUrl;
      setTreeProfile((prev) => ({
        ...prev,
        treePicture: {
          ...prev.treePicture,
          URL: updatedImageURL,
        },
      }));
      toast.success("Profile picture updated!", { id: "image-upload" });
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message, { id: "image-upload" });
        if ([400, 404].includes(error.response.status)) {
          removeItem();
          push("/admin/selectTree?removeSelectedTree");
        }
      } else {
        toast.error("An error occurred updating the picture.", { id: "image-upload" });
      }
    }
  };

  // Handler for deleting the profile picture
  const handleDelete = () => handleUpload("");

  return (
    <div className={styles.profileImageEditContainer}>
      <div className={styles.profileImageContainer}>
        {treeProfile?.treePicture?.URL ? (
          <Image
            className={styles.profileImage}
            src={treeProfile.treePicture.URL}
            alt="Profile"
            fill={true}
          />
        ) : (
          <span>NA</span>
        )}
      </div>
      <div className={styles.profileImageEditOptionsContainer}>
        <ChangePicButton
          treeProfile={treeProfile}
          setTreeProfile={setTreeProfile}
          treeUID={treeUID}
          handleUpload={handleUpload}
          handleDelete={handleDelete}
          />
      </div>
    </div>
  );
}
