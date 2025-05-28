import { use, useCallback, useEffect, useRef, useState } from "react";
import styles from "./thumbnail.module.css";
import Image from "next/image";
import Cropper from "react-easy-crop";
import { useDropzone } from "react-dropzone";
import { getCroppedImg } from "@/lib/cropImage/cropImage";
import {
  FaArrowLeft,
  FaFolderOpen,
  FaRotateLeft,
  FaRotateRight,
  FaTrash,
} from "react-icons/fa6";
import { toast } from "sonner";
import { thumbnailGallery } from "@/constants/thumbnailGallery";
import { FaSearch, FaTrashAlt } from "react-icons/fa";
import { RiGalleryView } from "react-icons/ri";
import { transform } from "lodash";
import GalleryImage from "./galleryImage";

export default function ThumbnailUpdationContent({ update, close }) {
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef();
  const [activeView, setActiveView] = useState("main");
  const [search, setSearch] = useState("");
  const [selectedGalleryImage, setSelectedGalleryImage] = useState(null);

  // Filter gallery images by search
  const filteredGallery = thumbnailGallery.filter(
    (img) =>
      img.name.toLowerCase().includes(search.toLowerCase()) ||
      img.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
  );

  // Handle gallery image select
  const handleGallerySelect = (img) => {
    setSelectedGalleryImage(img.uid);
    // Send to backend
    update({ thumbnailURL: img.url });
    toast.success("Thumbnail updated from gallery!", {
      id: "thumbnail-image-update",
    });
    close();
  };

  // Handle delete
  const handleDelete = () => {
    update({ thumbnailURL: "" });
    toast.success("Thumbnail deleted!", {
      id: "thumbnail-image-update",
    });
    close();
  };

  // Handle file drop or selection
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length === 0) return;
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result);
      setShowCropper(true);
    };
    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  const onCropComplete = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  // Upload to Cloudinary
  async function uploadToCloudinary(blob) {
    setUploading(true);
    setUploadProgress(0);
    toast.loading("Uploading image...",  {
      id: "thumbnail-image-update",
    });

    const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;
    const formData = new FormData();
    formData.append("file", blob);
    formData.append("upload_preset", "links_profile_photo");

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", url);
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100);
          setUploadProgress(percent);
        }
      };
      xhr.onload = () => {
        setUploading(false);
        setUploadProgress(0);
        if (xhr.status === 200) {
          toast.success("Image uploaded!", {
      id: "thumbnail-image-update",
    });
          resolve(JSON.parse(xhr.responseText));
        } else {
          console.error("Cloudinary error:", xhr.responseText);
          toast.error("Upload failed", {
      id: "thumbnail-image-update",
    });
          reject(xhr.responseText);
        }
      };
      xhr.onerror = () => {
        setUploading(false);
        setUploadProgress(0);
        toast.error("Upload failed", {
      id: "thumbnail-image-update",
    });
        reject(xhr.responseText);
      };
      xhr.send(formData);
    });
  }

  // Handle crop confirm
  const handleCropConfirm = async () => {
    try {
      const croppedBlob = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        rotation
      );
      const result = await uploadToCloudinary(croppedBlob);
      update({ thumbnailURL: result.secure_url });

      setShowCropper(false);
      setImageSrc(null);
    } catch (e) {
      console.log(e);

      toast.error("Failed to crop or upload image", {
      id: "thumbnail-image-update",
    });
    }
  };

  const handleCropCancel = () => {
    setShowCropper(false);
    setImageSrc(null);
  };

  // Main options view
  if (activeView === "main") {
    return (
      <div className={styles.optionsRoot}>
        <button
          className={styles.optionBtn}
          onClick={() => setActiveView("upload")}
        >
          <FaFolderOpen /> <span>Upload from Device</span>
          <FaArrowLeft style={{ transform: "rotate(180deg)" }} />
        </button>
        <button
          className={styles.optionBtn}
          onClick={() => setActiveView("gallery")}
        >
          <RiGalleryView /> <span>Choose from Gallery</span>
          <FaArrowLeft style={{ transform: "rotate(180deg)" }} />
        </button>
        <button
          className={styles.optionBtn}
          onClick={() => setActiveView("delete")}
        >
          <FaTrash /> <span>Delete Thumbnail</span>
          <FaArrowLeft style={{ transform: "rotate(180deg)" }} />
        </button>
      </div>
    );
  }

  // Upload view
  if (activeView === "upload") {
    return (
      <div className={styles.optionContent}>
        <button
          className={styles.backBtn}
          onClick={() => setActiveView("main")}
        >
          <FaArrowLeft /> Back
        </button>
        <>
          {showCropper ? (
            <div className={styles.cropperDialog}>
              <div className={styles.cropperWrapper}>
                <div className={styles.cropperArea}>
                  <Cropper
                    image={imageSrc}
                    crop={crop}
                    zoom={zoom}
                    rotation={rotation}
                    aspect={1}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onRotationChange={setRotation}
                    onCropComplete={onCropComplete}
                    cropShape="round"
                    showGrid={false}
                  />
                </div>

                <div className={styles.cropControlsAndButtonsWrapper}>
                  <div className={styles.cropControlsWrapper}>
                    <label>
                      <span>Zoom</span>
                      <input
                        type="range"
                        min={1}
                        max={3}
                        step={0.01}
                        value={zoom}
                        onChange={(e) => setZoom(Number(e.target.value))}
                      />
                    </label>

                    <button
                      onClick={() => setRotation((r) => r - 90)}
                      title="Rotate Left"
                    >
                      <FaRotateLeft />
                    </button>

                    <button
                      onClick={() => setRotation((r) => r + 90)}
                      title="Rotate Right"
                    >
                      <FaRotateRight />
                    </button>
                  </div>
                  <div className={styles.cropButtonsWrapper}>
                    <button
                      className={styles.cropBtn}
                      onClick={handleCropConfirm}
                      disabled={uploading}
                    >
                      {uploading
                        ? `Uploading... ${uploadProgress}%`
                        : "Crop & Upload"}
                    </button>

                    <button
                      className={styles.cancelBtn}
                      onClick={handleCropCancel}
                      disabled={uploading}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.thumbnailAndDropzoneContainer}>
              {/* <div className={styles.imageContainer}>
                {linkData.thumbnail && linkData.thumbnail.URL ? (
                  <>
                    <span>Loading...</span>
                    <Image
                      fill={true}
                      className={styles.image}
                      src={linkData.thumbnail.URL}
                      alt="link thumbnail"
                    />
                  </>
                ) : (
                  <span>NA</span>
                )}
              </div> */}

              <div className={styles.profileImageEditOptionsContainer}>
                <div {...getRootProps({ className: styles.dropzone })}>
                  <input {...getInputProps()} ref={inputRef} />
                  {isDragActive ? (
                    <p>Drop the image here ...</p>
                  ) : (
                    <p>
                      Drag & drop an image here, or{" "}
                      <button
                        type="button"
                        className={styles.chooseFileBtn}
                        onClick={() => inputRef.current.click()}
                      >
                        Choose file
                      </button>
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      </div>
    );
  }

  // Gallery view
  if (activeView === "gallery") {
    return (
      <div className={styles.optionContent}>
        <button
          className={styles.backBtn}
          onClick={() => setActiveView("main")}
        >
          <FaArrowLeft /> Back
        </button>
        <div className={styles.gallerySearchBar}>
          <FaSearch />
          <input
            type="text"
            placeholder="Search images..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className={styles.galleryGrid}>
          {filteredGallery.map((img) => (
            <GalleryImage
              key={img.uid}
              img={img}
              selected={selectedGalleryImage === img.uid}
              onClick={() => handleGallerySelect(img)}
              title={img.name}
            />
          ))}
          {filteredGallery.length === 0 && (
            <div className={styles.noResults}>No images found.</div>
          )}
        </div>
      </div>
    );
  }

  // Delete view
  if (activeView === "delete") {
    return (
      <div className={styles.optionContent}>
        <button
          className={styles.backBtn}
          onClick={() => setActiveView("main")}
        >
          <FaArrowLeft /> Back
        </button>
        <div className={styles.deleteTab}>
          <p>Are you sure you want to delete the thumbnail?</p>
          <button className={styles.deleteBtn} onClick={handleDelete}>
            <FaTrash /> Delete
          </button>
        </div>
      </div>
    );
  }

  return <p>Loading.. you should not seee this btw</p>;
}
