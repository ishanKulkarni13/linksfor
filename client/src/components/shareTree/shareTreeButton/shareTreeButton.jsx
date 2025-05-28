"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./shareTreeButton.module.css";
import { faCheck, faCopy, faShare } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useTreeUID } from "@/hooks/treeUID";
import axios from "axios";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import useWindowResize from "@/hooks/useWindowSize";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { Separator } from "@/components/ui/separator";

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
        <Separator className={styles.separator} />
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

export function ShareTreeButton({ type }) {
  // const [isPopUpActive, setIsPopUpActive] = useState(false);
  // const { width } = useWindowResize();

  // function onShareButtonCLick() {
  //   setIsPopUpActive(true);
  // }

  // if (!width) return <></>;

  if (type != "floating" ) {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <button
            className={styles.shareTreeButtoncontainer}
          >
            <FontAwesomeIcon className={styles.icon} icon={faShare} />
            {type == 'logoOnly'?<></>: <span>Share</span>}
          </button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Edit profile</DrawerTitle>
            
          </DrawerHeader>
          <ShareTreeContent />
          <DrawerFooter className="pt-2">
            {/* <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose> */}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition duration-300 ease-in-out */}
        <button className={styles.dialogShareButton} ><FaRegShareFromSquare /> <span>Share</span> </button>
      </DialogTrigger>
      <DialogContent >
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you re done.
          </DialogDescription>
        </DialogHeader>
        <ShareTreeContent />
      </DialogContent>
    </Dialog>
  );

  
}
