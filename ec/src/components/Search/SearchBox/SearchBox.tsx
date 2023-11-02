import { searchIcon } from "../../../icons/icons"
import { useState, useEffect } from "react"
import styles from "./SearchBox.module.css"
import { SearchResultsType } from "../Search"
import { useNavigate } from "react-router-dom"

interface Props {
  onQueryChange: (_: string) => void
  query: string
}

export default function SearchBox({ onQueryChange, query }: Props) {
  const navigate = useNavigate()
  function handleChange(newQuery: string) {
    onQueryChange(newQuery)
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // navigate to the search page
    if (!query) return
    navigate("/search?q=" + query)
  }

  return (
    <form className={styles.container} onSubmit={(e) => onSubmit(e)}>
      <input
        className={styles.search_input}
        type="text"
        placeholder="What are you looking for?"
        value={query}
        onChange={(e) => handleChange(e.target.value)}
      />
      <button type="submit" className={styles.search_icon}>
        {searchIcon}
      </button>
    </form>
  )
}
