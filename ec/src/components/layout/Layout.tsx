import styles from "./Layout.module.css"
import { ReactNode, useState } from "react"
import Header from "./Header/Header"
import Footer from "./Footer/Footer"
// import Modal from "./Modal/Modal"

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
      {/* {modalOpen && <Modal closeModal={closeModal} />} */}
    </div>
  )
}
