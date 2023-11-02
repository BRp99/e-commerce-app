import { NavLink } from "react-router-dom"
import styles from "./BackButtonToHomePage.module.css"
import { arrowBackIcon } from "../icons/icons"

export default function BackButtonToHomePage() {
  return (
    <div>
      <div>
        <NavLink to={"/"} className={styles.btn_back}>
          {arrowBackIcon}
          <span>Back</span>
        </NavLink>
      </div>
    </div>
  )
}
