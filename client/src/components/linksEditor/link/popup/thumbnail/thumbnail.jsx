import Popup from '@/components/popup/popup';
import { CldUploadWidget } from 'next-cloudinary';
import styles from './thumbnail.module.css'

export default function ThumbnailPopup({update, linkData, close}) {
  console.log(linkData);
  
  return (
    <div>
      <Popup  close={close}  title={'Thumbnail'}>
        <div className={styles.popupContent} >
         <CldUploadWidget
          options={{
            // sources: ["local", "url", "unsplash"],
            sources: ["local", "unsplash"],
            uploadPreset: "links_profile_photo",
            cropping: true, //add a cropping step
            multiple: false, //restrict upload to a single file
            // folder: "user_images", //upload files to the specified folder
            tags: ["user", "tree", "treePicture", "linksFor"], //add the given tags to the uploaded files
            // context: {alt: "user_uploaded"}, //add the given context data to the uploaded files
            // clientAllowedFormats: ["images"], //restrict uploading to image files only
            maxImageFileSize: 2000000, //restrict file size to less than 2MB
            maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
            theme: "custom", //change to a purple theme

            styles: {
              palette: {
                // 2
                window: "hsl(222.2, 84%, 4.9%)", // TOP AND BOTTOM PANEL
                sourceBg: "hsl(222.2, 70%, 10%)",
                windowBorder: "#FFFFFF", // bordre
                tabIcon: "#FFFFFF", //logoes
                inactiveTabIcon: "#FFFFFF",
                menuIcons: "#FFFFFF", // logo name and X
                link: "#FFFFFF",
                action: "#FFFFFF", // icons boxes next and crop
                error: "#cc0000",
                inProgress: "#0433ff",
                complete: "#339933",
                textDark: "#000000", // Access millions of images from Unsplash.
                textLight: "#fcfffd",
              },
            },
          }}
          signatureEndpoint="/api/cloudinary-sign"
          onSuccess={(result, { widget }) => {
            update({thumbnailURL: result.info.secure_url})
            // set(result.info.secure_url);
            widget.close();
          }}
        >
          {({ open }) => {
            function handleOnClick() {
              open();
            }
            return (
              <button className={styles.saveButton} onClick={handleOnClick}>
                Change Thumbnail
              </button>
            );
            // <button onClick={handleOnClick}>Upload an Image</button>;
          }}
        </CldUploadWidget>
        {linkData.thumbnail?.URL && linkData.thumbnail.URL}
        </div>
      </Popup>
    </div>
  )
}
