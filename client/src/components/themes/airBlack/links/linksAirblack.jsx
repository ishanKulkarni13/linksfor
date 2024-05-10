import LinkAirblack from "../link/linkAirblack"
import styles from "./linksAirBlack.module.css"
export default function LinksAirblack({links}) {
  return (
    <div className={styles.container} >
      {
        links.map((link)=> {return ( <LinkAirblack link={link}/>)})
      }
    </div>
  )
}
