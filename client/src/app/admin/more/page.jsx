import SelectTree from '@/components/selectTree/selectTree'
import styles from './morePage.module.css'
import TopBar from '@/components/topbar/topBar'

export default function AdminMorePage() {
  return (
    <>
    <TopBar/>
    <div className={styles.container}>
      <SelectTree/>
    </div>
    </>
  )
}
