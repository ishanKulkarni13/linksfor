"use client";
import styles from "./editTreeTitleAndBio.module.css";
import { backendBaseURL } from "@/constants/index";
import { useRouter } from "next/navigation";
import {  toast } from "sonner";
import axios from "axios";
import { useLocalstorage } from "@/hooks/localStorage";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/debounce";

export default function EditTreeTitleAndBio({ treeUID,  treeProfile}) {
  const { push } = useRouter();
  const { removeItem } = useLocalstorage("selectedTree");
  const [titleAndBio, setTitleAndBio] = useState({
    title: treeProfile.treeName,
    bio: treeProfile.treeBio,
  });
  const debounceTitleAndBio = useDebounce(titleAndBio, 3000);

  const handleInputChange = (event) => setTitleAndBio({ ...titleAndBio, [event.target.name]: event.target.value });

  const updateTitleAndBio = async (title, bio) => {
    if (!treeUID) {
      console.log(treeUID);
      return toast.error("didn't got treeUID");
    }
    try {
      const res = await axios.post(
        `/api/tree/edit/profile/${treeUID}`,
        { treeName:title, treeBio:bio },
        { withCredentials: true }
      );
      let data = res.data.treeProfile;
    } catch (error) {
      console.log(error);
      if (error.response) {
        // if server responded
        toast.error(error.response.data.message);
        if (error.response.status === 404 || error.response.status === 400) {
          console.log(error.response);
          //   removeItem();
          //   return push("/admin/selectTree?removeSelectedTree");
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
    e.preventDefault()
    // updateTitleAndBio(titleAndBio.title, titleAndBio.bio );
  };

  useEffect(()=>{
    updateTitleAndBio(titleAndBio.title, titleAndBio.bio );
  }, [debounceTitleAndBio])

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
              <lable className={styles.lable}>bio</lable>
              <input
                className={styles.input}
                placeholder="New Bio"
                type="text"
                name="bio"
                value={titleAndBio.bio}
                onChange={handleInputChange}
              />
            </div>

            <button type="submit" className={styles.saveButton}>
              Save
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
