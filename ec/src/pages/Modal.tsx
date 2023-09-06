import styles from "../pages/Modal.module.css"
import { useEffect, useState } from "react"

interface ModalProps {
  closeModal: () => void
}

export default function Modal({ closeModal }: ModalProps) {
  const [content, setContent] = useState(true)

  function showContentLogIn() {
    setContent(true)
  }

  function showContentSigIn() {
    setContent(false)
  }

  useEffect(() => {
    function handleClickOutsideModal(event: MouseEvent) {
      if (
        (event.target as HTMLElement).classList.contains(
          styles.container_overlay
        )
      ) {
        closeModal()
      }
    }

    function handleEscKeyPressModal(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeModal()
        if (document.activeElement instanceof HTMLElement)
          document.activeElement.blur()
      }
    }

    document.addEventListener("click", handleClickOutsideModal)
    document.addEventListener("keydown", handleEscKeyPressModal)

    return () => {
      document.removeEventListener("click", handleClickOutsideModal)
      document.removeEventListener("keydown", handleEscKeyPressModal)
    }
  }, [closeModal])

  return (
    <div className={styles.container_overlay}>
      <div className={styles.modal}>
        <button className={styles.close_modal} onClick={closeModal}>
          {"\u00d7"}
        </button>

        {/* LOG IN */}

        <div className={styles.input_registration}>
          <div className={styles.tab_btn}>
            <button className={styles.tab_btn_log} onClick={showContentLogIn}>
              Log in
            </button>
            <button className={styles.tab_btn_sign} onClick={showContentSigIn}>
              Sign in
            </button>
          </div>

          {content ? (
            <>
              <h1 className={styles.log_in}>Log in</h1>

              <div>
                Email
                <input type="email" />
              </div>

              <div>
                Password
                <input type="password" />
              </div>
              <h3 className={styles.forgot}>Forgot your passaword?</h3>
              <button className={styles.log_btn_log}>Log in</button>

              <div className={styles.divider_line_log} />

              <div className={styles.big_tech_companies_registration_log}>
                <button className={styles.google_btn_log}>
                  Login with Google
                </button>
                <button className={styles.fb_btn_log}>
                  Login with Facebook
                </button>
                <button className={styles.apple_btn_log}>
                  Login with Apple
                </button>
              </div>
            </>
          ) : (
            // SIGN IN
            <>
              <h1 className={styles.sign_in}>Sign in</h1>
              <div>
                Name
                <input type="text" />
              </div>
              <div>
                Email
                <input type="email" />
              </div>

              <div>
                Password
                <input type="password" />
              </div>
              <button className={styles.sign_btn_sign}>Sign in</button>
              <div className={styles.divider_line_sign} />

              <div className={styles.big_tech_companies_registration_sign}>
                <button className={styles.google_btn_sign}>
                  Continue with Google
                </button>
                <button className={styles.fb_btn_sign}>
                  Continue with Facebook
                </button>
                <button className={styles.apple_btn_sign}>
                  Continue with Apple
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
