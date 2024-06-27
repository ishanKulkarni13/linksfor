import styles from './style.module.css'
import SelectTreePopup from "@/components/selectTree/selectTreePopup/selectTreePopup";

export default function Page() {
  return (
    <div className={styles.container}>
      <SelectTreePopup/>
    </div>
  )
}
