import LinkSpray from "../link/linkSpray"
import styles from "./links.module.css"
export default function LinksSpray({links}) {
  return (
    <div className={styles.container} >
      {
        
        links.map((link)=> {return ( <LinkSpray  key={link.title} link={link}/>)})
      }
    </div>
  )
}
