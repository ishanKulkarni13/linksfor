"use client";
import styles from "./editTreeTheme.module.css";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "sonner";
import axios from "axios";
import { useLocalstorage } from "@/hooks/localStorage";
import { useEffect, useState } from "react";
import { avaibleTreeThemes } from "@/constants";
import Image from "next/image";

export default function EditTreeTheme({ treeUID, treeProfile }) {
  const { push } = useRouter();
  const { removeItem, getItem } = useLocalstorage("selectedTree");
  const [treeTheme, setTreeTheme] = useState();

  const handleInputChange = (event) =>
    setTitleAndBio({ ...titleAndBio, [event.target.name]: event.target.value });

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
    // updateTitleAndBio(titleAndBio.title, titleAndBio.bio );
  };

  return (
    <>
      <div className={` ${styles.container}`}>
        <h1 className={` ${styles.title}`}>Themes</h1>
        <div className={`${styles.formContainer}`}>
          <form onSubmit={onSubmit} className={styles.form}>
            {avaibleTreeThemes.map((theme) => (
              <div key={`${theme.name}`} className={`${styles.themeContainer}`}>
                <input
                  className={`${styles.themeInput}`}
                  type="radio"
                  name="themes"
                  id={theme.id}
                />
                <label className={`${styles.themeLable}`} htmlFor={theme.id}>
                  <div className={`${styles.theme}`}>
                    <div className={`${styles.themeDisplayPictureContaner}`}>
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

        <Toaster richColors={true} />
      </div>
    </>
  );
}
