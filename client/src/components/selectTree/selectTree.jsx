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
import { toast } from "sonner";
import axios from "axios";
import Link from "next/link";
import SelectTreePopup from "./selectTreePopup/selectTreePopup";
import useWindowResize from "@/hooks/useWindowSize";
import useHandelReselectTree from "@/hooks/handelReselectTree";

export default function SelectTree() {
  let treeUID = useTreeUID();
  const { width } = useWindowResize();
  const [selectedTreeProfile, setSelectedTreeProfile] = useState();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { redirectToSelectTree } = useHandelReselectTree();

  function onSwitchTreeButtonCLick() {
    setIsPopupOpen(true);
  }

  const getTreeProfile = async () => {
    if (!treeUID) {
      console.log(treeUID);
      return toast.error("didn't got treeUID while getting treeprofile");
    }
    try {
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
          redirectToSelectTree();
        }
      } else if (error.request) {
        //req was made but go no response
        toast.error(`Error occured`);
      } else {
        toast.error(`some error occured, `, {
          description: error.message,
        });
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
        <div className={styles.loadingContainer}>
          Loading selected tree Profie{" "}
        </div>
      ) : (
        <>
          <button
            onClick={onSwitchTreeButtonCLick}
            className={styles.selectedTreeContainer}
          >
            <div className={styles.selectedTreeProfileContainer}>
              <div className={styles.selectedTreeImageContainer}>
                {selectedTreeProfile.treePicture &&
                selectedTreeProfile.treePicture.URL ? (
                  <>
                    <span>Loading</span>
                    <Image
                      fill={true}
                      className={styles.profileImage}
                      src={`${selectedTreeProfile.treePicture.URL}`}
                      alt="Tree Image"
                    />
                  </>
                ) : (
                  <span>NA</span>
                )}
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
          
            <SelectTreePopup
              selectedTreeProfile={selectedTreeProfile}
              setSelectedTreeProfile={setSelectedTreeProfile}
              open={isPopupOpen}
              setOpen={setIsPopupOpen}
            />
          
        </>
      )}

      <Link href={"/admin/tree/new"} className={styles.createNewTreeButton}>
        <p>Create new tree</p>
      </Link>
    </div>
  );
}
