import { logoIcon } from "../../../icons/icons"
import styles from "./Footer.module.css"

export default function Footer() {
  const getCurrentYear = () => {
    return new Date().getFullYear()
  }

  return (
    <footer className={styles.container}>
      &copy; {getCurrentYear()} {logoIcon}
    </footer>
  )
}
