"use client";
import styles from "./shareTreePopup.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCopy, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Input } from "@/components/ui/input";
import {  toast } from "sonner";
import Popup from "@/components/popup/popup";
import { useEffect, useState } from "react";
import { useTreeUID } from "@/hooks/treeUID";
import axios from "axios";
import AdaptiveDrawer from "@/components/adaptiveDrawer/adaptiveDrawer";

export default function ShareTreePopup({ open, setOpen }) {
  const [shareableLink, setShareableLink] = useState(null);
  const [isLinkCopyed, setIsLinkCopyed] = useState(false);
  let treeUID = useTreeUID();

  async function onCopyButtonClick() {
    try {
      await navigator.clipboard.writeText(shareableLink)
      toast.success("Link Copyed To Clipboard")
      setIsLinkCopyed(true);

      setTimeout(()=>  setIsLinkCopyed(false) , 5000)
    } catch (error) {
      setIsLinkCopyed(false);
      toast.error(error.message)
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
      setShareableLink("")
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


  function Content(){
    return (
       <div className={styles.shareContainer}>
          <div className={styles.copyToClipboardContainer}>
            <input
              className={styles.linkContainer}
              type="text"
              readOnly
              value={(shareableLink)? shareableLink: `Loading...` }
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
  return (
    <>
      <AdaptiveDrawer  heading={`Share tree`} open={open} onOpenChange={setOpen}>
       <Content/>
      </AdaptiveDrawer>
    </>
  );
}


