import Popup from "@/components/popup/popup";
import React, { useState } from "react";
import { DialogDescription } from "@/components/ui/dialog";
import Image from "next/image";
import styles from "./layout.module.css";

const LAYOUTS = [
  {
    key: "classic",
    title: "Classic",
    description: "Efficient, direct and compact.",
    preview:
      "https://res.cloudinary.com/kakashib2k/image/upload/v1748545657/LinksFor/important/links-layout-thumbnail/classic-layout.webp", // Place your preview image in public/
    previewAlt: "Classic layout preview",
  },
  {
    key: "featured",
    title: "Featured",
    description:
      "Make your link stand out with a larger, more attractive display.",
    preview:
      "https://res.cloudinary.com/kakashib2k/image/upload/v1748545657/LinksFor/important/links-layout-thumbnail/featured-layout.webp", // Place your preview image in public/
    previewAlt: "Featured layout preview",
  },
];

export default function LayoutPopup({ close, update, linkData }) {
  // Default to classic if not set
  const [selected, setSelected] = useState(linkData?.layout || "classic");

  const handleSelect = (key) => setSelected(key);

  const handleSave = () => {
    if (update) update({ layout: selected });
    close && close();
  };

  return (
    <div className={styles.layoutDialogRoot}>
      <div className={styles.layoutOptionsList}>
        {LAYOUTS.map((layout) => (
          <button
            key={layout.key}
            className={
              selected === layout.key
                ? `${styles.layoutOptionCard} ${styles.selected}`
                : styles.layoutOptionCard
            }
            onClick={() => handleSelect(layout.key)}
            type="button"
          >
            <span className={styles.radioWrapper}>
              {selected === layout.key ? (
                <span className={styles.radioSelected} />
              ) : (
                <span className={styles.radioUnselected} />
              )}
            </span>

            <div className={styles.layoutTextAndPreviewWrapper}>

              <span className={styles.layoutOptionText}>
                <span className={styles.layoutOptionTitle}>{layout.title}</span>
                <span className={styles.layoutOptionDesc}>
                  {layout.description}
                </span>
              </span>

              {/* <div className={styles.layoutOptionPreview}>
                <Image
                  src={layout.preview}
                  alt={layout.previewAlt}
                  fill={true}
                  className={styles.previewImage}
                />
              </div> */}

            </div>
          </button>
        ))}
      </div>
      <div className={styles.layoutDialogActions}>
        <button className={styles.saveBtn} onClick={handleSave}>
          Save
        </button>
        <button className={styles.cancelBtn} onClick={close}>
          Cancel
        </button>
      </div>
    </div>
  );
}
