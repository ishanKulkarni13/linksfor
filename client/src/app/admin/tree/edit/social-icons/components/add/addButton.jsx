import { FaPlus } from "react-icons/fa6";
import styles from "./add.module.css";
import AddPopUpContent from "./addPopUpContent";
import { useState } from "react";
import useWindowResize from "@/hooks/useWindowSize";
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

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function AddButton({
  links,
  setSocials,
  treeUID,
  type,
  disabled,
}) {
  const [isPopUpActive, setIsPopUpActive] = useState(false);

  const { width } = useWindowResize();
  function handleAddLinkButtonCLick(e) {
    setIsPopUpActive(true);
  }
  function closePopUp() {
    setIsPopUpActive(false);
  }

  if (width < 640) {
    return (
      <Drawer open={isPopUpActive} onOpenChange={setIsPopUpActive}>
        <DrawerTrigger asChild>
          <button
            disabled={disabled}
            className={styles.addLinkButton}
            onClick={handleAddLinkButtonCLick}
          >
            <div className={styles.addIconContainer}>
              <FaPlus />{" "}
            </div>
            <p>Add</p>
          </button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Edit profile</DrawerTitle>
            <DrawerDescription>
              Enter the URL and then select the icon for your social media link.
            </DrawerDescription>
          </DrawerHeader>
          <AddPopUpContent
            setSocials={setSocials}
            close={closePopUp}
            treeUID={treeUID}
          />
          <DrawerFooter className="">
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  } else
    return (
      <Dialog open={isPopUpActive} onOpenChange={setIsPopUpActive}>
        <DialogTrigger asChild>
          <button
            disabled={disabled}
            className={styles.addLinkButton}
            onClick={handleAddLinkButtonCLick}
          >
            <div className={styles.addIconContainer}>
              <FaPlus />{" "}
            </div>
            <p>Add</p>
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Enter the URL and then select the icon for your social media link.
            </DialogDescription>
          </DialogHeader>
          <AddPopUpContent
            setSocials={setSocials}
            close={closePopUp}
            treeUID={treeUID}
          />
        </DialogContent>
      </Dialog>
    );
}
