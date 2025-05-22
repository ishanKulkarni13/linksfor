"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./shareTreeButton.module.css";
import { faCheck, faCopy, faShare } from "@fortawesome/free-solid-svg-icons";
// import ShareTreePopup from "../shareTreePopup/shareTreePopup";
import { useEffect, useState } from "react";
// import Popup from "@/components/popup/popup";
import { toast } from "sonner";

// import styles from "./shareTreePopup.module.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCheck, faCopy } from "@fortawesome/free-solid-svg-icons";
// import { Input } from "@/components/ui/input";
// import {  toast } from "sonner";
// import Popup from "@/components/popup/popup";
// import { useEffect, useState } from "react";
import { useTreeUID } from "@/hooks/treeUID";
import axios from "axios";
import AdaptiveDrawer from "@/components/adaptiveDrawer/adaptiveDrawer";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";

function ShareTreeContent() {
  const [shareableLink, setShareableLink] = useState(null);
  const [isLinkCopyed, setIsLinkCopyed] = useState(false);
  let treeUID = useTreeUID();

  async function onCopyButtonClick() {
    try {
      await navigator.clipboard.writeText(shareableLink);
      toast.success("Link Copyed To Clipboard");
      setIsLinkCopyed(true);

      setTimeout(() => setIsLinkCopyed(false), 5000);
    } catch (error) {
      setIsLinkCopyed(false);
      toast.error(error.message);
    }
  }

  const handelSetShareableLink = async () => {
    if (!treeUID) {
      return toast.error("didn't got treeUID while getting treeprofile");
    }
    try {
      const res = await axios.get(`/api/tree/shareableLink/${treeUID}`, {
        withCredentials: true,
      });
      const link = res.data.shareableLink;
      setShareableLink(link);
    } catch (error) {
      setShareableLink("");
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
  };

  useEffect(() => {
    if (treeUID) {
      handelSetShareableLink();
    }
  }, [treeUID]);

  return (
    <div className={styles.shareContainer}>
      <div className={styles.copyToClipboardContainer}>
        <input
          className={styles.linkContainer}
          type="text"
          readOnly
          value={shareableLink ? shareableLink : `Loading...`}
        />
        <button
          disabled={!shareableLink}
          onClick={onCopyButtonClick}
          className={styles.copyIconContainer}
        >
          {!isLinkCopyed ? (
            <FontAwesomeIcon className={styles.copyIcon} icon={faCopy} />
          ) : (
            <FontAwesomeIcon className={styles.copyIcon} icon={faCheck} />
          )}
        </button>
      </div>
    </div>
  );
}

export function ShareTreeButton() {
  const [isPopUpActive, setIsPopUpActive] = useState(false);

  function onShareButtonCLick() {
    setIsPopUpActive(true);
  }

  return (
    <Drawer open={isPopUpActive} onOpenChange={setIsPopUpActive}>
      <DrawerTrigger asChild>
       <button
        onClick={onShareButtonCLick}
        className={styles.shareTreeButtoncontainer}
      >
        <FontAwesomeIcon className={styles.icon} icon={faShare} />
        <span>Share</span>
      </button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader >
          <DrawerTitle>Edit profile</DrawerTitle>
          <DrawerDescription>
            Make changes to your profile here. Click save when you're done.
          </DrawerDescription>
        </DrawerHeader>
        <ShareTreeContent/>
        <DrawerFooter className="pt-2">
          {/* <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose> */}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );

  return (
    <>
      {/* button */}
      <button
        onClick={onShareButtonCLick}
        className={styles.shareTreeButtoncontainer}
      >
        <FontAwesomeIcon className={styles.icon} icon={faShare} />
        <span>Share</span>
      </button>

      {/* Popup  */}
      <ShareTreePopup open={isPopUpActive} setOpen={setIsPopUpActive} />
    </>
  );
}

export default function ShareTreePopup({ open, setOpen }) {
  return (
    <>
      <AdaptiveDrawer heading={`Share tree`} open={open} onOpenChange={setOpen}>
        <ShareTreeContent />
      </AdaptiveDrawer>
    </>
  );
}
