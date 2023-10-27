import { useNavigate } from "react-router-dom"
import styles from "./BackButtonToHomePage.module.css"
import { arrowBackIcon } from "../icons/icons"

export default function BackButtonToHomePage() {
  const navigate = useNavigate()
  const navigateToHomePage = () => {
    navigate("/")
  }

  return (
    <div>
      <div className={styles.back}>
        <button className={styles.btn_back} onClick={navigateToHomePage}>
          {arrowBackIcon}
          <span>Back</span>
        </button>
      </div>
    </div>
  )
}
