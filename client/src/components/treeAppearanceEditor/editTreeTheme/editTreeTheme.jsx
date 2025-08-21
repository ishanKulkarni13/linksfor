"use client";
import styles from "./editTreeTheme.module.css";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";
import { useLocalstorage } from "@/hooks/localStorage";
import { useEffect, useRef, useState } from "react";
import { avaibleTreeThemes } from "@/constants/index";
import Image from "next/image";
import useUpdateTreeProfile from "@/hooks/useUpdateTreeProfile";

export default function EditTreeTheme({ treeUID, treeProfile }) {
  const { push } = useRouter();
  const { removeItem, getItem } = useLocalstorage("selectedTree");
  const { updateTreeProfile } = useUpdateTreeProfile(treeUID);
  const formRef = useRef(null);
  const [selectedTreeThemeID, setSelectedTreeThemeID] = useState(
    treeProfile.theme.selectedTheme.themeID
  );

  const handleInputChange = async (e) => {
    const themeID = e.target.id;
    const themeName = e.target.dataset.themeName;
    // console.log(themeID);
    setSelectedTreeThemeID(themeID);

    toast.loading(`Updating theme to ${themeName || themeID}`, {
      id: "theme-update-toast",
    });
    const { response, error } = await updateTreeProfile({
      selectedThemeID: themeID,
    });
    if (response) {
      toast.success(`Updated theme to ${themeName || themeID}`, {
        id: "theme-update-toast",
      });
    }
    if (error) {
      toast.error(error.message, {
        id: "theme-update-toast",
      });

      setSelectedTreeThemeID(selectedTreeThemeID);
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
                  data-theme-name={theme.displayName}
                  checked={selectedTreeThemeID == theme.id}
                  onChange={handleInputChange}
                />
                <label className={`${styles.themeLable}`} htmlFor={theme.id}>
                  <div className={`${styles.theme}`}>
                    <div className={`${styles.themeDisplayPictureContainer}`}>
                      <div className={`${styles.themeDisplayPictureWrapper}`}>
                        <Image
                          className={`${styles.themeDisplayPicture}`}
                          fill={true}
                          src={`${theme.displayPicture}`}
                          alt={`${theme.name}-display-picture`}
                        />
                      </div>
                    </div>
                    <div className={`${styles.themeName}`}>
                      {theme.displayName}
                    </div>
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
