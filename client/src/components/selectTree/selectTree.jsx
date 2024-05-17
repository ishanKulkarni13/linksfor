"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./selectTree.module.css";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useTreeUID } from "@/hooks/treeUID";
import { Toaster, toast } from "sonner";
import axios from "axios";
import Link from "next/link";
import SelectTreePopup from "./selectTreePopup/selectTreePopup";

export default function SelectTree() {
  let treeUID = useTreeUID();
  const [treeProfile, setTreeProfile] = useState();
  const [isPopUpActive, setIsPopUpActive] = useState(false);
  function onSwitchTreeButtonCLick(e) {
    setIsPopUpActive(true);
  }
  function closePopUp(e) {
    setIsPopUpActive(false);
  }

  const getTreeProfile = async () => {
    if (!treeUID) {
      console.log(treeUID);
      return toast.error("didn't got treeUID while getting treeprofile");
    }
    try {
      console.log(`got treeUId in getTreeProfile as:`, treeUID);
      const res = await axios.get(`/api/tree/profile/${treeUID}`, {
        withCredentials: true,
      });
      let treeProfile = res.data.treeProfile;
      setTreeProfile(treeProfile);
    } catch (error) {
      console.log(error);
      if (error.response) {
        // if server responded
        toast.error(error.response.data.message);
        if (error.response.status === 404 || error.response.status === 401) {
          removeItem();
          return push("/admin/selectTree?removeSelectedTree");
        }
      } else if (error.request) {
        //req was made but go no response
        toast.error(`error occured`);
      } else {
        toast.error(`some error occured: ${error.message}`);
      }
    }
  };

  const onSwitchTreeCLick = () => {};

  useEffect(() => {
    if (treeUID) {
      getTreeProfile();
    }
  }, [treeUID]);

  return (
    <div className={styles.container}>
      {!true ? (
        <div>Loading selected tree Profie </div>
      ) : (
        <>
          <button
            onClick={onSwitchTreeButtonCLick}
            className={styles.selectedTreeContainer}
          >
            <div className={styles.selectedTreeProfileContainer}>
              <div className={styles.selectedTreeImageContainer}>
                <Image
                  fill={true}
                  className={styles.profileImage}
                  //   src={`${treeProfile.treePicture.URL}`}
                  src={`http://res.cloudinary.com/kakashib2k/image/upload/v1713685024/uiccf1wbzyioazqgve5q.png`}
                  alt="Tree Image"
                />
              </div>
              <div className={styles.selectedTreeTextContainer}>
                <h1 className={styles.selectedTreeName}>{`treeName`}</h1>
                <p className={styles.selectedTreeUID}>{`treeProfile.UID`}</p>
              </div>
            </div>

            <div className={styles.switchTree}>
              <p>Switch Tree</p>
            </div>
          </button>
          {isPopUpActive && (
            <SelectTreePopup
              selectedTreeUID={treeUID}
              close={closePopUp}
            />
          )}
        </>
      )}

      <Link href={"/admin/tree/create"} className={styles.createNewTreeButton}>
        <p>Create new tree</p>
      </Link>
      <Toaster position="bottom" richColors />
    </div>
  );
}
