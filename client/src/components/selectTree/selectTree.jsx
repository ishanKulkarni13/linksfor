"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./selectTree.module.css";
import {
  faArrowDown,
  faExchange,
  faRepeat,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useTreeUID } from "@/hooks/treeUID";
import { Toaster, toast } from "sonner";
import axios from "axios";
import Link from "next/link";
import SelectTreePopup from "./selectTreePopup/selectTreePopup";
import useWindowResize from "@/hooks/useWindowSize";

export default function SelectTree() {
  let treeUID = useTreeUID();
  const { width } = useWindowResize();
  const [selectedTreeProfile, setSelectedTreeProfile] = useState();
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
      setSelectedTreeProfile(treeProfile);
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
      {!selectedTreeProfile ? (
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
                    src={`${selectedTreeProfile.treePicture.URL}`}
                  alt="Tree Image"
                />
              </div>
              <div className={styles.selectedTreeTextContainer}>
                <h1 className={styles.selectedTreeName}>
                  {selectedTreeProfile.treeName}
                </h1>
                <p className={styles.selectedTreeUID}>
                  {selectedTreeProfile.UID}
                </p>
              </div>
            </div>

            <div className={styles.switchTree}>
              {width < 540 ? (
                <FontAwesomeIcon
                  className={styles.changeIcon}
                  icon={faRepeat}
                />
              ) : (
                <p className={styles.changeIcon}>Switch Tree</p>
              )}
            </div>
          </button>
          {isPopUpActive && (
            <SelectTreePopup
              selectedTreeProfile={selectedTreeProfile}
              setSelectedTreeProfile={setSelectedTreeProfile}
              close={closePopUp}
            />
          )}
        </>
      )}

      <Link href={"/admin/tree/new"} className={styles.createNewTreeButton}>
        <p>Create new tree</p>
      </Link>
      <Toaster position="bottom" richColors />
    </div>
  );
}
