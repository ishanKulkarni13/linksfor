import Link from "../link/link"
import styles from "./links.module.css"
export default function Links({links}) {
  return (
    <div className={styles.container} >
      {
        
        links.map((link)=> {return ( <Link  key={link.title} link={link}/>)})
      }
    </div>
  )
}
