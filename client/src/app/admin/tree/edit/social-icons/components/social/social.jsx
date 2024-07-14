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
import { useState } from "react";
import { toast } from "sonner";
// import LinkEditPopup from "./popup/linkEditPopup";
import { FaRegImage } from "react-icons/fa6";
import { CgSpinner } from "react-icons/cg";
import Image from "next/image";

// icons
import { BsTelegram } from "react-icons/bs";

export default function Social({ link, deleteSocial, treeUID }) {
  const [linkData, setLinkData] = useState(link);
  const [popup, setPopup] = useState();
  const controls = useDragControls();
  const [isLoading, setIsLoading] = useState({ link: false, deleting: false });

  

  const closePopup = () => setPopup();
  const openPopup = (e) => setPopup(e.currentTarget.getAttribute("data-popup"));

  const handelDeleteButtonClick = () => {
    setIsLoading({ ...isLoading, deleting: true });
    deleteSocial(link.UID);
  };

  const handleInputChange = (e) =>
    setLinkData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (event) => {
    setIsLoading({ ...isLoading, link: true });
    event.preventDefault();
    console.log(linkData);
    await sendLinkTitleAndURLToBackend();
    setIsLoading({ ...isLoading, link: false });
  };

  const sendLinkTitleAndURLToBackend = async () => {
    toast.loading(`Updating link data...`, {
      id: "updating",
    });
    let { title, URL, UID } = linkData;
    try {
      let res;
      if (link.type != `header`) {
        // for link
        res = await fetch(`/api/tree/edit/link/titleAndURL/${treeUID}`, {
          method: "POST",
          cache: "no-store",
          body: JSON.stringify({
            treeUID,
            linkUID: UID,
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
                <BsTelegram className={styles.logo} />
              </div>
              {/* links for the social */}
              <form onSubmit={handleSubmit}>
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
              </form>

           
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
