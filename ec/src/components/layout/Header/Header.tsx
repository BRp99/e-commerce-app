import styles from "./Header.module.css"
import { NavLink } from "react-router-dom"
import Search from "../../Search/Search"
import ActionContainer from "../../ActionContainer/ActionContainer"
import { logoIcon } from "../../../icons/icons"

interface HeaderProps {
  openModal(): void
}

export default function Header({ openModal }: HeaderProps) {
  return (
    <div className={styles.container}>
      <NavLink to="/" className={styles.logo}>
        {logoIcon}
      </NavLink>
      <Search />
      <ActionContainer openModal={openModal} />
    </div>
  )
}
