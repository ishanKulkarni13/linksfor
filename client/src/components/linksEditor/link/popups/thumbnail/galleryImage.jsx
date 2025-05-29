// import styles from "./thumbnail.module.css";
// import { useInView } from "react-intersection-observer";

// export default function GalleryImage({ img, selected, onClick }) {
//   const { ref, inView } = useInView({ triggerOnce: true, rootMargin: "100px" });
//   return (
//     <div
//       ref={ref}
//       className={`${styles.galleryItem} ${selected ? styles.selected : ""}`}
//       onClick={onClick}
//       tabIndex={0}
//       title={img.name}
//       style={{
//         animationDelay: inView ? "0s" : "0s", // Animation triggers on mount
//       }}
//     >
//       {inView && (
//         <img
//           src={img.url}
//           alt={img.name}
//           className={styles.galleryImg}
//           loading="lazy"
//         />
//       )}
//       <div className={styles.galleryImgName}>{img.name}</div>
//     </div>
//   );
// }