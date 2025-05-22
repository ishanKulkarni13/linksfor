import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import styles from "./customDialog.module.css"
import { FaRegShareSquare } from "react-icons/fa";

export default function CustomDialog({title, description}){
    
      const [open, setOpen] = useState(true);

    return(
            <Dialog open={open} onOpenChange={setOpen} className={styles.dialog}>
                <DialogTrigger asChild>
                  <button className={styles.addLinkButton}>
                   <FaRegShareSquare />
                  </button>
                </DialogTrigger>
        
                {/* <DialogContent> */}
                <DialogContent className={styles.dialogContent}>
                  <DialogHeader className={styles.DialogHeader}>
                    <DialogTitle className={styles.dialogTitle}>
                     {title?title:""}
                    </DialogTitle>
                    <DialogDescription className={styles.DialogDescription}>
                     {description?description:""}
                    </DialogDescription>
                  </DialogHeader>
        
                  <div className={styles.popUpFormContainer}>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus perferendis dolores totam numquam architecto, corporis excepturi ipsam omnis iste consequatur eligendi impedit deleniti ut libero similique quo quas a voluptas dolorem at velit blanditiis officia!</p>
                  </div>
                </DialogContent>
                {/* </DialogContent> */}
              </Dialog>
    )
}