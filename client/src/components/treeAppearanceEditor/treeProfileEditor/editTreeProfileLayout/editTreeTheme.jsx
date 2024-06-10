"use client";
import styles from "./editTreeTheme.module.css";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "sonner";
import axios from "axios";
import { useLocalstorage } from "@/hooks/localStorage";
import { useEffect, useRef, useState } from "react";
import { avaibleTreeThemes } from "@/constants";
import Image from "next/image";
import useUpdateTreeProfile from "@/hooks/useUpdateTreeProfile";

export default function FaultuEditTreeTheme({ treeUID, treeProfile }) {
  const { push } = useRouter();
  const { removeItem, getItem } = useLocalstorage("selectedTree");
  const { updateTreeProfile } = useUpdateTreeProfile(treeUID);
  const formRef = useRef(null);
  const [selectedTreeThemeID, setSelectedTreeThemeID] = useState(treeProfile.theme.selectedTheme.themeID);

  const handleInputChange = async (e) => {
    console.log(e.target.id);
    setSelectedTreeThemeID(e.target.id)

    const { response, error } = await updateTreeProfile({ selectedThemeID: e.target.id });
    if (response) {
      toast.success(`updated theme to ${e.target.id}`)
    }
    if (error) {
      toast.error(error.message)
      setSelectedTreeThemeID(selectedTreeThemeID)
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
                          objectFit="cover"
                          objectPosition="centre"
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
