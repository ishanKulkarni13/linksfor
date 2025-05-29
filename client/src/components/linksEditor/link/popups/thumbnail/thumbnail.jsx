import { useState } from "react";
// import thumbnailGallery from "@/constants/thumbnailGallery";
import styles from "./thumbnail.module.css";
import { thumbnailGallery } from "@/constants/thumbnailGallery";
import ReusableImageUploader from "@/components/imageUploader/reusableImageUploader";

export default function ThumbnailUpdationContent({ update, close, initialThumbnail }) {
  // initialThumbnail: pass the current thumbnail URL from parent

  // Handler for when a new image is uploaded or selected
  const handleUpload = (url) => {
    update({ thumbnailURL: url });
    close();
  };

  // Handler for deleting the thumbnail
  const handleDelete = () => {
    update({ thumbnailURL: ""});
    close();
  };

  return (
    <div className={styles.thumbnailRoot}>
      <ReusableImageUploader
        cloudinaryFolder="links_profile_photo"
        gallery={thumbnailGallery}
        onUpload={handleUpload}
        onDelete={handleDelete}
        title="Edit Thumbnail"
        initialImage={initialThumbnail}
        accept="image/*"
        customCropShape="round"
      />
    </div>
  );
}