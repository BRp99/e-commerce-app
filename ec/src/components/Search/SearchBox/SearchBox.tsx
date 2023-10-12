import { searchIcon } from "../../../icons/icons"
import { useState, useEffect } from "react"
import styles from "./SearchBox.module.css"
import { SearchResultsType } from "../Search"

interface Props {
  onQueryChange: (_: string) => void
  results: SearchResultsType
}

export default function SearchBox({ onQueryChange, results }: Props) {
  const [query, setQuery] = useState("")

  function handleChange(newQuery: string) {
    setQuery(newQuery)
    onQueryChange(newQuery)
  }

  useEffect(() => {
    if (results === "NoQuery") setQuery("")
  }, [results])

  return (
    <div className={styles.container}>
      <div className={styles.search_icon}>{searchIcon}</div>

      <input
        className={styles.search_input}
        type="text"
        placeholder="What are you looking for?"
        value={query}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  )
}
