import { useAuth0 } from "@auth0/auth0-react"
import styles from "./AuthButtonToggle.module.css"
import { logIcon } from "../../icons/icons"

export default function AuthButtonToggle() {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0()

  const handleLoginLogout = () => {
    if (isAuthenticated) {
      logout({ logoutParams: { returnTo: window.location.origin } })
    } else {
      loginWithRedirect()
    }
  }

  return (
    <div>
      <button onClick={handleLoginLogout} className={styles.login_btn}>
        <div className={styles.login_icon}> {logIcon} </div>
        <div className={styles.login_text}> {isAuthenticated ? "Log Out" : "Log In"} </div>
      </button>
    </div>
  )
}
