"use client";
import styles from "./shareTreePopup.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCopy, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Input } from "@/components/ui/input";
import { Toaster, toast } from "sonner";
import Popup from "@/components/popup/popup";
import { useEffect, useState } from "react";
import { useTreeUID } from "@/hooks/treeUID";
import axios from "axios";

export default function ShareTreePopup({ close }) {
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
      console.log(treeUID);
      return toast.error("didn't got treeUID while getting treeprofile");
    }
    try {
      console.log(`got treeUId in getShareableLink as:`, treeUID);
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
    // setShareableLink( `${process.env.NEXT_PUBLIC_FRONTEND_URL}/tree/`)
    if (treeUID) {
      handelSetShareableLink();
    }
  }, [treeUID]);


  return (
    <>
      <Popup title={`Share tree`} close={close}>
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
              {/* <FontAwesomeIcon className={styles.copyIcon}  icon={faCopy} /> */}
              {!isLinkCopyed ? (
                <FontAwesomeIcon className={styles.copyIcon} icon={faCopy} />
              ) : (
                <FontAwesomeIcon className={styles.copyIcon} icon={faCheck} />
              )}
            </button>
          </div>
        </div>
      </Popup>
      <Toaster richColors={true} position="bottom-left" />
    </>
  );
}
