import { logoIcon } from "../../../icons/icons"
import styles from "./Footer.module.css"
export default function Footer() {
  return <footer className={styles.container}>&copy; 2023 {logoIcon}</footer>
}
