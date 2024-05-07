import Link from 'next/link'
import styles from './navItem.module.css'

export default function NavItem({link}) {
  const {title, path} = link
  return (
    <Link href={path}>{title}</Link>
  )
}
