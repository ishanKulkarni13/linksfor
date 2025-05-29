import { useCallback, useRef, useState } from "react";
import Cropper from "react-easy-crop";
import { useDropzone } from "react-dropzone";
import { getCroppedImg } from "@/lib/cropImage/cropImage";
import { toast } from "sonner";
import styles from "./reusableImageUploader.module.css";
import {
  FaArrowLeft,
  FaFolderOpen,
  FaRotateLeft,
  FaRotateRight,
  FaTrash,
} from "react-icons/fa6";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { RiGalleryView } from "react-icons/ri";

export default function ReusableImageUploader({
  cloudinaryFolder = "default_folder",
  gallery = [],
  onUpload,
  onDelete,
  title = "Upload Image",
  initialImage = "",
  accept = "image/*",
  customCropShape = "round",
  children,
  setOpen
}) {
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
  const filteredGallery = gallery.filter(
    (img) =>
      img.name.toLowerCase().includes(search.toLowerCase()) ||
      img.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
  );

  // Handle gallery image select
  const handleGallerySelect = (img) => {
    setSelectedGalleryImage(img.uid);
    onUpload && onUpload(img.url);
    // toast.success("Image updated from gallery!");
    setActiveView("main");
    setOpen && setOpen(false);
  };

  // Handle delete
  const handleDelete = () => {
    onDelete && onDelete();
    toast.success("Image deleted!", { id: "image-upload" });
    setActiveView("main");
    setOpen && setOpen(false);
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
    accept,
    multiple: false,
  });

  const onCropComplete = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  // Upload to Cloudinary (signed)
  async function uploadToCloudinary(blob) {
    setUploading(true);
    setUploadProgress(0);
    toast.loading("Uploading image...", { id: "image-upload" });

    // 1. Prepare params to sign
    const timestamp = Math.floor(Date.now() / 1000);
    const paramsToSign = {
      timestamp,
      folder: cloudinaryFolder,
    };

    // 2. Get signature from your API
    const signRes = await fetch("/api/cloudinary-sign", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paramsToSign }),
    });
    const { signature } = await signRes.json();

    // 3. Prepare form data for Cloudinary
    const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;
    const formData = new FormData();
    formData.append("file", blob);
    formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
    formData.append("timestamp", timestamp);
    formData.append("signature", signature);
    formData.append("folder", cloudinaryFolder);

    // 4. Upload to Cloudinary
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
          toast.success("Image uploaded!", { id: "image-upload" });
          resolve(JSON.parse(xhr.responseText));
        } else {
          toast.error("Upload failed", { id: "image-upload" });
          reject(xhr.responseText);
        }
      };
      xhr.onerror = () => {
        setUploading(false);
        setUploadProgress(0);
        toast.error("Upload failed", { id: "image-upload" });
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
      const uploadedUrl = result.secure_url;
      if (onUpload) {
        // Wait for onUpload to finish (in case it's async and updates state)
        const maybePromise = onUpload(uploadedUrl);
        if (maybePromise && typeof maybePromise.then === 'function') {
          await maybePromise;
        }
      }
      toast.success("Image uploaded!", { id: "image-upload" });
      setShowCropper(false);
      setImageSrc(null);
      setActiveView("main");
      setOpen && setOpen(false); // Close dialog/drawer after upload & update
    } catch (e) {
      toast.error("Failed to crop or upload image", { id: "image-upload" });
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
        {/* {initialImage && (
          <div className={styles.previewContainer}>
            <Image
              fill={true}
              src={initialImage}
              alt="Current"
              className={styles.previewImg}
            />
          </div>
        )} */}

        <button
          className={styles.optionBtn}
          onClick={() => setActiveView("upload")}
        >
          <FaFolderOpen /> <span>Upload from Device</span>
        </button>
        <button
          className={styles.optionBtn}
          onClick={() => setActiveView("gallery")}
        >
         <RiGalleryView />
          <span>Choose from Gallery</span>
        </button>
        <button
          className={styles.optionBtn}
          onClick={() => setActiveView("delete")}
        >
          <FaTrash /> <span>Delete Image</span>
        </button>
        {children}
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
                  cropShape={customCropShape}
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
          <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
          <input
            type="text"
            placeholder="Search images..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className={styles.galleryGrid}>
          {filteredGallery.map((img) => (
            <div
              key={img.uid}
              className={`${styles.galleryItem} ${
                selectedGalleryImage === img.uid ? styles.selected : ""
              }`}
              onClick={() => handleGallerySelect(img)}
              tabIndex={0}
              title={img.name}
            >
              <img
                src={img.url}
                alt={img.name}
                className={styles.galleryImg}
                loading="lazy"
              />
              <div className={styles.galleryImgName}>{img.name}</div>
            </div>
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
          <p>Are you sure you want to delete the image?</p>
          <button className={styles.deleteBtn} onClick={handleDelete}>
            <FaTrash /> Delete
          </button>
        </div>
      </div>
    );
  }

  return <p>Loading.. you should not see this.</p>;
}
