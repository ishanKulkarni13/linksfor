import TopBar from '@/components/topbar/topBar';
import styles from './style.module.css'
export default function AdminLayout({ children }) {
  return (
    <>
      <TopBar />
      <div className={styles.children}>
        {children}
      </div>
    </>
  );
}