import styles from "./Header.module.css"
import { NavLink } from "react-router-dom"
import ActionContainer from "../../ActionContainer/ActionContainer"
import { logoIcon } from "../../../icons/icons"
import SearchBox from "../../Search/SearchBox/SearchBox"
import { useState } from "react"

interface HeaderProps {
  openModal(): void
}

export default function Header({ openModal }: HeaderProps) {
  const [query, setQuery] = useState("")

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <NavLink to="/" className={styles.logo}>
          {logoIcon}
        </NavLink>
        <div className={styles.top_search}>
          {/* <Search /> */}
          <SearchBox query={query} onQueryChange={setQuery} />
        </div>
        <ActionContainer openModal={openModal} />
      </div>
      <div className={styles.bottom}>
        {/* <Search /> */}
        <SearchBox query={query} onQueryChange={setQuery} />
      </div>
    </div>
  )
}
