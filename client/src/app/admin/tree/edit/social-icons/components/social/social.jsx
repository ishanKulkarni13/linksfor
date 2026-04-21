import { Reorder, useDragControls } from "framer-motion";
import { backendBaseURL } from "@/constants/index";
import styles from "./style.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faDotCircle,
  faGripVertical,
  faImage,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FiLayout } from "react-icons/fi";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { FaRegImage } from "react-icons/fa6";
import { CgSpinner } from "react-icons/cg";
import Image from "next/image";

// icons
import { SocialIcon } from "@/components/icons/social/socialIcon";
import { Skeleton } from "@/components/ui/skeleton";
import { useDebounce } from "@/hooks/debounce";

export default function Social({ link, deleteSocial, treeUID }) {
  const [linkData, setLinkData] = useState(link);
  const [popup, setPopup] = useState();
  const controls = useDragControls();
  const [isLoading, setIsLoading] = useState({ link: false, deleting: false, mounted:false });

  const closePopup = () => setPopup();
  const openPopup = (e) => setPopup(e.currentTarget.getAttribute("data-popup"));

  const debouncelinkData = useDebounce(linkData, 1500);

  const handelDeleteButtonClick = () => {
    setIsLoading({ ...isLoading, deleting: true });
    deleteSocial(link.UID);
  };

  const handleInputChange = (e) =>
    setLinkData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (event) => {
    return  event.preventDefault();
    // setIsLoading({ ...isLoading, link: true });
    // event.preventDefault();
    // console.log(linkData);
    // await sendLinkTitleAndURLToBackend();
    // setIsLoading({ ...isLoading, link: false });
  };

  useEffect(()=>{
      (async () => {  
        if(isLoading.mounted ){
          setIsLoading({ ...isLoading, link: true });
          await sendLinkTitleAndURLToBackend()
         setIsLoading({ ...isLoading, link: false });
    
        }
      })();
    }, [debouncelinkData]);
  
    useEffect(()=>{
      setIsLoading({...isLoading, mounted: true})
    }, [isLoading, sendLinkTitleAndURLToBackend])


  const sendLinkTitleAndURLToBackend = async () => {
    toast.loading(`Updating data...`, {
      id: "updating",
    });
    let { title, URL, UID } = linkData;
    try {
      let res;
      if (link.type != `header`) {
        // for link
        res = await fetch(`/api/admin/tree/edit/socials/update`, {
          method: "POST",
          cache: "no-store",
          body: JSON.stringify({
            treeUID,
            socialUID: UID,
            title,
            URL,
          }),
          credentials: "include",
          headers: {
            Accept: "applications/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          },
        });
      } else {
        // for header
        res = await fetch(`/api/tree/edit/header/${treeUID}`, {
          method: "POST",
          cache: "no-store",
          body: JSON.stringify({
            treeUID,
            linkUID: UID,
            title,
          }),
          credentials: "include",
          headers: {
            Accept: "applications/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          },
        });
      }

      if (res.ok) {
        toast.success("Updated", {
          id: "updating",
          duration: 1250,
        });
        const responseData = await res.json();
      } else {
        const responseData = await res.json();
        toast.error(responseData.message, {
          id: "updating",
          duration: 3500,
        });
      }
    } catch (error) {
      console.error("Error in sending header title to DB", error);
      toast.error("Error in sending header tltle to DB", {
        id: "updating",
        duration: 3500,
      });
    }
  };

  return (
    <>
      <Reorder.Item
        className={styles.DNDItem}
        value={link}
        id={link}
        dragListener={false}
        dragControls={controls}
      >
        <div className={styles.linkContainer}>
          <div className={styles.link}>
            <div
              className={`${styles.left}, ${styles.DNDIcon}`}
              onPointerDown={(e) => {
                if (!isLoading.deleting && !isLoading.link) {
                  controls.start(e);
                }
              }}
            >
              <FontAwesomeIcon icon={faGripVertical} />{" "}
            </div>

            <div className={styles.centre} onSubmit={handleSubmit}>
              <div className={styles.logoContainer}>
                <SocialIcon iconName={link.icon} />
              </div>
              {/* links for the social */}
              {/* <form onSubmit={handleSubmit}> */}
                <div className={styles.URLContainer}>
                  <input
                    className={styles.URLInput}
                    type="text"
                    name="URL"
                    value={linkData.URL}
                    onChange={handleInputChange}
                  />
                  <button
                    disabled={isLoading.URL}
                    className={styles.submitButton}
                    type="submit"
                  >
                    <FontAwesomeIcon icon={faCheck} />
                  </button>
                </div>
              {/* </form> */}
            </div>

            <div className={styles.right}>
              <button
                disabled={isLoading.deleting}
                className={styles.deleteButton}
                onClick={handelDeleteButtonClick}
              >
                {!isLoading.deleting ? (
                  <FontAwesomeIcon icon={faTrash} className={styles.icon} />
                ) : (
                  <CgSpinner className={`${styles.icon} spiner`} />
                )}
              </button>
            </div>
          </div>

          {/* <EditLinkPanel className={styles.editPanelContainer} /> */}
        </div>
      </Reorder.Item>
    </>
  );
}

export function SocialSkeleton() {
  <Skeleton className={`${styles.DNDItem} bg-red-800 h-52`}>
    <Skeleton className={styles.linkContainer}>
      <Skeleton className={styles.link}>
        <Skeleton className={`${styles.left}, ${styles.DNDIcon}`}>
          <Skeleton className={`Fa-icon h-20 w-20 rounded-full`} />
        </Skeleton>

        <Skeleton className={styles.centre}>
          <Skeleton className={styles.logoContainer}>
          <Skeleton className={`Fa-icon h-20 w-20 rounded-full`} />
          </Skeleton>
          {/* links for the social */}
          <Skeleton>
            <Skeleton className={styles.URLContainer}>
              <Skeleton className={styles.URLInput} type="text" name="URL" />
              <Skeleton className={styles.submitButton} type="submit">
                <Skeleton className={`Fa-icon h-20 w-20 rounded-full`} />
              </Skeleton>
            </Skeleton>
          </Skeleton>
        </Skeleton>

        <Skeleton className={styles.right}>
          <Skeleton className={styles.deleteButton}>
            <Skeleton className={`Fa-icon h-20 w-20 rounded-full`} />
          </Skeleton>
        </Skeleton>
      </Skeleton>

      <Skeleton className={`Fa-icon h-20 w-20 rounded-full`} />
    </Skeleton>
  </Skeleton>;
}
