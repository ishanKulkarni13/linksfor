import { Reorder, useDragControls } from "framer-motion";
import {backendBaseURL} from "@/constants/index"
import EditLinkPanel from "../editLinkPanels/editLinkPanel";
import styles from "./link.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGripVertical,
  faPen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { toast } from "sonner";

export default function Link({ link, deleteLink , treeUID}) {
  const [linkData, setLinkData] = useState(link);
  const controls = useDragControls();

  const handelDeleteButtonClick = () => {
    deleteLink(link.UID);
  };

  const handleInputChange = (e) => setLinkData(prev => ({...prev, [e.target.name]: e.target.value}))

  const handleSubmit = async(event) => {
    event.preventDefault();
    console.log(linkData);
    await sendLinkTitleAndURLToBackend()
  }

  const sendLinkTitleAndURLToBackend = async()=>{
    toast.info(`sendLinkTitleAndURLToBackend function is running`);
    let {title, URL, UID} = linkData;
    try {
      const res = await fetch(
        `${backendBaseURL}/tree/edit/editTitleAndURL/${treeUID}`,
        {
          method: "POST",
          cache: "no-store",
          body: JSON.stringify({
            treeUID,
            linkUID: UID,
            title,
            URL
          }),
          credentials: "include",
          headers: {
            Accept: "applications/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          },
        }
      );

      if (res.ok) {
        const responseData = await res.json();
        console.log('responce from sending Title and Input to DB', responseData);
      } else {
        const responseData = await res.json();
        toast.error(responseData.message);
      }
    } catch (error) {
      console.error("Error in sending Title and Input to DB", error);
      toast.error("Error in sending Title and Input to DB");
    }
  }


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
              onPointerDown={(e) => controls.start(e)}
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
                <button><FontAwesomeIcon type="submit" icon={faPen} /></button>
              </div>
              <div className={styles.URLContainer}>
                <input
                  className={styles.URLInput}
                  type="text"
                  name="URL"
                  value={linkData.URL}
                  onChange={handleInputChange}
                />
                <button>
                  <FontAwesomeIcon icon={faPen} type="submit" />
                </button>
              </div>
              <div className={styles.OtherOptionsContainer}>
                <span>A</span>
                <span>B</span>
                <span>C</span>
                <span>D</span>
                <span>A</span>
                <span>A</span>
                <span>A</span>
              </div>
            </form>

            <div className={styles.right}>
              <button
                className={styles.deleteButton}
                onClick={handelDeleteButtonClick}
              >
                {" "}
                <FontAwesomeIcon icon={faTrash} />{" "}
              </button>
            </div>
          </div>

          {/* <EditLinkPanel className={styles.editPanelContainer} /> */}
        </div>
      </Reorder.Item>
    </>
  );
}
