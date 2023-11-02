import { arrowBackIcon } from "../icons/icons"
import styles from "./BackButtonToCategoryPage.module.css"
import { NavLink } from "react-router-dom"

export default function BackButtonToCategoryPage({ category }: { category: string }) {
  return (
    <div>
      <div className={styles.back}>
        <NavLink to={`/categories/${category}`} className={styles.btn_back}>
          {arrowBackIcon}
          <span>Back</span>
        </NavLink>
      </div>
    </div>
  )
}
