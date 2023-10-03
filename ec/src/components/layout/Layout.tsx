import styles from "./Layout.module.css"
import { ReactNode, useState } from "react"
import Header from "../../pages/Header"
import Footer from "./Footer"
import Modal from "../../pages/Modal"

type LayoutProps = {
  children?: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const [modalOpen, setModalOpen] = useState(false)

  function openModal() {
    setModalOpen(true)
  }

  function closeModal() {
    setModalOpen(false)
  }

  return (
    <div className={styles.container}>
      <Header openModal={openModal} />

      <main>{children}</main>

      <Footer />
      {modalOpen && <Modal closeModal={closeModal} />}
    </div>
  )
}
