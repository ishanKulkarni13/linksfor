"use client";
import styles from "./editTreeTitleAndBio.module.css";
import { backendBaseURL } from "@/constants/index";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";
import { useLocalstorage } from "@/hooks/localStorage";
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "@/hooks/debounce";

export default function EditTreeTitleAndBio({ treeUID, treeProfile }) {
  const { push } = useRouter();
  const { removeItem } = useLocalstorage("selectedTree");
  const [titleAndBio, setTitleAndBio] = useState({
    title: treeProfile.treeName,
    bio: treeProfile.treeBio,
  });
  const debounceTitleAndBio = useDebounce(titleAndBio, 3000);
  const [warning, setWarning] = useState("");
  const isServerUpdate = useRef(false);
  const textareaRef = useRef(null);

  const handleInputChange = (event) => {
    setTitleAndBio({ ...titleAndBio, [event.target.name]: event.target.value });

    // Auto-resize logic for textarea
    if (event.target.name === "bio" && textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  };

  const updateTitleAndBio = async (title, bio) => {
    setWarning("");

    if (!treeUID) {
      console.log(treeUID);
      return toast.error("didn't got treeUID");
    }
    try {
      const res = await axios.post(
        `/api/tree/edit/profile/${treeUID}`,
        { treeName: title, treeBio: bio },
        { withCredentials: true }
      );
      let data = res.data.treeProfile;
      // toast.success("Tree profile updated successfully");
      if (data.treeBio && data.treeName) {
        // Only update if different
        if (
          data.treeBio !== titleAndBio.bio ||
          data.treeName !== titleAndBio.title
        ) {
          isServerUpdate.current = true;
          setTitleAndBio({
            title: data.treeName,
            bio: data.treeBio,
          });
        }
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        // if server responded
        toast.error(error.response.data.message);
        console.log(error.response.data);
        setWarning(error.response.data.message);

        if (
          error.response.status === 404 ||
          error.response.status === 400 ||
          error.response.status === 401
        ) {
          console.log(error.response);
          removeItem();
          return push("/admin/select-tree?removeSelectedTree");
        }
      } else if (error.request) {
        //req was made but go no response
        toast.error(`error occured`);
      } else {
        toast.error(`some error occured: ${error.message}`);
      }
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // updateTitleAndBio(titleAndBio.title, titleAndBio.bio );
  };

  useEffect(() => {
    // Only call updateTitleAndBio if not a server update
    if (isServerUpdate.current) {
      isServerUpdate.current = false;
      return;
    }
    if (
      titleAndBio.title === treeProfile.treeName &&
      titleAndBio.bio === treeProfile.treeBio
    ) {
      return; // No changes to update
    }
    updateTitleAndBio(titleAndBio.title, titleAndBio.bio);
    // eslint-disable-next-line
  }, [debounceTitleAndBio]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [titleAndBio.bio]);

  return (
    <>
      <div className={` ${styles.container}`}>
        <div className={`${styles.formContainer}`}>
          <form onSubmit={onSubmit} className={styles.form}>
            <div className={styles.inputContainer}>
              <label className={styles.lable}>Title</label>
              <input
                className={styles.input}
                placeholder="New title"
                type="text"
                name="title"
                value={titleAndBio.title}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles.inputContainer}>
              <label className={styles.lable}>Bio</label>
              <textarea
                ref={textareaRef}
                className={styles.input}
                placeholder="New Bio"
                name="bio"
                value={titleAndBio.bio}
                onChange={handleInputChange}
                // style={{ resize: "auto", overflow: "hidden" }} // allow user resize, but auto-resize too
              />
            </div>
            {warning && (
              <div className={styles.warningWrapper}>
                <p>{warning}</p>
              </div>
            )}

            <button type="submit" className={styles.saveButton}>
              Save
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
