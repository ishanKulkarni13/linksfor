"use client";
import styles from "./editTreeProfileLayout.module.css";
import { useRouter } from "next/navigation";
import {  toast } from "sonner";
import { useLocalstorage } from "@/hooks/localStorage";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import useUpdateTreeProfile from "@/hooks/useUpdateTreeProfile";

export default function EditTreeProfileLayout({ treeUID, treeProfile }) {
  const { push } = useRouter();
  const { removeItem, getItem } = useLocalstorage("selectedTree");
  const { updateTreeProfile } = useUpdateTreeProfile(treeUID);
  const formRef = useRef(null);
  const [selectedTreeProfileLayout, setSelectedTreeProfileLayout] = useState(
    treeProfile.treeProfileLayout
  );

  const avaibleTreeProfileLayouts = [
    {
      displayName: "Classic",
      displayPicture:
        "https://res.cloudinary.com/kakashib2k/image/upload/v1717148505/LinksFor/important/treeProfileLayout/pictures/classic",
      key: "classic",
    },
    {
      displayName: "Hero",
      displayPicture:
        "https://res.cloudinary.com/kakashib2k/image/upload/v1717148505/LinksFor/important/treeProfileLayout/pictures/hero",
      key: "hero",
    },
    {
      displayName: "Row",
      displayPicture:
        "https://res.cloudinary.com/kakashib2k/image/upload/v1717148505/LinksFor/important/treeProfileLayout/pictures/row",
      key: "row",
    },
  ];

  const handleInputChange = async (e) => {
    setSelectedTreeProfileLayout(e.target.id);

    const { response, error } = await updateTreeProfile({
      treeProfileLayout: e.target.id,
    });
    if (response) {
      toast.success(`Updated style ${e.target.id}`);
    }
    if (error) {
      toast.error(error.message);
      setSelectedTreeProfileLayout(selectedTreeProfileLayout);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className={` ${styles.container}`}>
        <h1 className={` ${styles.title}`}>Image style</h1>
        <div className={`${styles.formContainer}`}>
          <form onSubmit={onSubmit} ref={formRef} className={styles.form}>
            {avaibleTreeProfileLayouts.map((style) => (
              <div key={`${style.name}`} className={`${styles.styleContainer}`}>
                <input
                  className={`${styles.styleInput}`}
                  type="radio"
                  name="treeProfileLayout"
                  id={style.key}
                  checked={selectedTreeProfileLayout == style.key}
                  onChange={handleInputChange}
                />
                <label className={`${styles.themeLable}`} htmlFor={style.key}>
                  <div className={`${styles.theme}`}>
                    <div className={`${styles.displayPictureContainer}`}>
                      <div className={`${styles.displayPicture}`}>
                        <Image
                          fill={true}
                          objectFit="cover"
                          objectPosition="centre"
                          src={`${style.displayPicture}`}
                          alt={`${style.name}-display-picture`}
                        />
                      </div>
                    </div>
                    <div className={`${styles.styleName}`}>{style.displayName}</div>
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
