import { Reorder, useDragControls } from "framer-motion";
import { backendBaseURL } from "@/constants/index";
import styles from "./link.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faDotCircle,
  faGripVertical,
  faImage,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import {FiLayout} from 'react-icons/fi'
import { useState } from "react";
import { toast } from "sonner";

export default function Link({ link, deleteLink, treeUID }) {
  const [linkData, setLinkData] = useState(link);
  const [popup, setPopup] = useState('')
  const controls = useDragControls();
  const [isLoading, setIsLoading] = useState({link:false, deleting:false})
  

  const handelDeleteButtonClick = () => {
    setIsLoading({...isLoading, deleting:true});
    deleteLink(link.UID);
  };

  const handleInputChange = (e) =>
    setLinkData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (event) => {
    setIsLoading({...isLoading, link:true});
    event.preventDefault();
    console.log(linkData);
    await sendLinkTitleAndURLToBackend();
    setIsLoading( {...isLoading, link:false});
  };

  const sendLinkTitleAndURLToBackend = async () => {
    toast.info(`sendLinkTitleAndURLToBackend function is running`);
    let { title, URL, UID } = linkData;
    try {
      let res
      if(link.type != `header`){
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
      } else{
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
        const responseData = await res.json();
        console.log(
          "responce from DB",
          responseData
        );
      } else {
        const responseData = await res.json();
        toast.error(responseData.message);
      }
    } catch (error) {
      console.error("Error in sending header title to DB", error);
      toast.error("Error in sending header tltle to DB");
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
                if(!isLoading.deleting && !isLoading.link){
                  controls.start(e)
                }
              }}
            >
              <FontAwesomeIcon icon={faGripVertical} />{" "}
            </div>

            <form className={styles.centre} onSubmit={handleSubmit}>
              <div className={styles.titleContainer}>
                <input
                  className={styles.titleInput}
                  type="text"
                  name="title"
                  value={linkData.title}
                  onChange={handleInputChange}
                />
                <button disabled={isLoading.link} className={styles.submitButton} type="submit">
                  <FontAwesomeIcon icon={faCheck} />
                </button>
              </div>

              {link.type != `header` && (
                <div className={styles.URLContainer}>
                  <input
                    className={styles.URLInput}
                    type="text"
                    name="URL"
                    value={linkData.URL}
                    onChange={handleInputChange}
                  />
                  <button disabled={isLoading.link} className={styles.submitButton} type="submit">
                    <FontAwesomeIcon icon={faCheck} />
                  </button>
                </div>
              )}

              <div className={styles.OtherOptionsContainer}>
                <button className={styles.thumbnailContainer}  >
                  <FontAwesomeIcon className={styles.icon} icon={faImage} /> 
                </button>
                <button className={styles.layoutContainer} >
                 <FiLayout/>
                </button>
              </div>

              
              
              
            </form>

            <div className={styles.right}>
              <button
              disabled={isLoading.deleting}
                className={styles.deleteButton}
                onClick={handelDeleteButtonClick}
              >
                {(!isLoading.deleting)?(<FontAwesomeIcon icon={faTrash} />):(<FontAwesomeIcon  icon={faDotCircle} />) }
                
                
              </button>
            </div>
          </div>

          {/* <EditLinkPanel className={styles.editPanelContainer} /> */}
        </div>
      </Reorder.Item>
    </>
  );
}
