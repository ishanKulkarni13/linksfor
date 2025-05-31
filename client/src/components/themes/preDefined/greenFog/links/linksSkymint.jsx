import LinkSkymint from "../link/link"
import styles from "./links.module.css"
export default function LinksGreenFog({links}) {
  return (
    <div className={styles.container} >
      {
        
        links.map((link)=> {return ( <LinkSkymint  key={link.title} link={link}/>)})
      }
    </div>
  )
}
