"use client";
import styles from "./editTreeTheme.module.css";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "sonner";
import axios from "axios";
import { useLocalstorage } from "@/hooks/localStorage";
import { useEffect, useRef, useState } from "react";
import { avaibleTreeThemes } from "@/constants";
import Image from "next/image";

export default function EditTreeTheme({ treeUID, treeProfile }) {
  const { push } = useRouter();
  const { removeItem, getItem } = useLocalstorage("selectedTree");
  const formRef = useRef(null);
  const [selectedTreeThemeID, setSelectedTreeThemeID] = useState(treeProfile.theme.selectedTheme.themeID);

  const handleInputChange = (e) => {
    // setSelectedTreeThemeID()
    // const formData = new FormData(formRef.current);
    // const selectedTheme = formData.get("themes");
    // toast(selectedTheme);
    console.log(e.target.id);
    setSelectedTreeThemeID(e.target.id)
  };

  const updateTitleAndBio = async (title, bio) => {
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
    e.preventDefault();
  };

  return (
    <>
      <div className={` ${styles.container}`}>
        <h1 className={` ${styles.title}`}>Themes</h1>
        <div className={`${styles.formContainer}`}>
          <form onSubmit={onSubmit} ref={formRef} className={styles.form}>
            {avaibleTreeThemes.map((theme) => (
              <div key={`${theme.name}`} className={`${styles.themeContainer}`}>
                <input
                  className={`${styles.themeInput}`}
                  type="radio"
                  name="themes"
                  id={theme.id}
                  checked={selectedTreeThemeID == theme.id}
                  onChange={handleInputChange}
                />
                <label className={`${styles.themeLable}`} htmlFor={theme.id}>
                  <div className={`${styles.theme}`}>
                    <div className={`${styles.themeDisplayPictureContainer}`}>
                      <div className={`${styles.themeDisplayPicture}`}>
                        <Image
                          fill={true}
                          src={`${theme.displayPicture}`}
                          alt={`${theme.name}-display-picture`}
                        />
                      </div>
                    </div>
                    <div className={`${styles.themeName}`}>{theme.name}</div>
                  </div>
                </label>
              </div>
            ))}
          </form>
        </div>
      </div>
    </>
  );
}
