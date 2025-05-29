"use client";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import ReusableImageUploader from "@/components/imageUploader/reusableImageUploader";
import { thumbnailGallery } from "@/constants/thumbnailGallery";
import styles from "./editTreePicture.module.css";
import { set } from "lodash";

function ChangePicContent({
  treeProfile,
  setTreeProfile,
  treeUID,
  handleUpload,
  handleDelete,
  setOpen,
}) {
  return (
    <div>
      <div className={styles.profileImageEditOptionsContainer}>
        <ReusableImageUploader
          cloudinaryFolder="links_profile_photo"
          onUpload={handleUpload}
          onDelete={handleDelete}
          title="Edit Profile Picture"
          initialImage={treeProfile?.treePicture?.URL || ""}
          accept="image/*"
          customCropShape="round"
          gallery={thumbnailGallery}
          setOpen={setOpen} // Pass setOpen down
        />
      </div>
    </div>
  );
}

export default function ChangePicButton({
  treeProfile,
  setTreeProfile,
  treeUID,
  handleUpload,
  handleDelete,
}) {
  const [isMobile, setIsMobile] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <button className={styles.changePicButton}>Update Image</button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Edit Profile Picture</DrawerTitle>
          </DrawerHeader>
          <ChangePicContent
            treeProfile={treeProfile}
            setTreeProfile={setTreeProfile}
            treeUID={treeUID}
            handleUpload={handleUpload}
            handleDelete={handleDelete}
            setOpen={setOpen} // Pass setOpen
          />
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className={styles.changePicButton}>Update Image</button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile Picture</DialogTitle>
        </DialogHeader>
        <ChangePicContent
          treeProfile={treeProfile}
          setTreeProfile={setTreeProfile}
          treeUID={treeUID}
          handleUpload={handleUpload}
          handleDelete={handleDelete}
          setOpen={setOpen} // Pass setOpen
        />
      </DialogContent>
    </Dialog>
  );
}
