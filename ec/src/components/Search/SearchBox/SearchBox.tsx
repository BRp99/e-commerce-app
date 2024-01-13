import { searchIcon } from "../../../icons/icons"
import styles from "./SearchBox.module.css"
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
    if (!query) return
    navigate("/search/" + query)
    onQueryChange("")
  }

  return (
    <form data-testid="search-box-form" className={styles.container} onSubmit={(e) => onSubmit(e)}>
      <input
        data-testid="search-box-input"
        className={styles.search_input}
        type="text"
        placeholder="What are you looking for?"
        value={query}
        onChange={(e) => handleChange(e.target.value)}
      />
      <button data-testid="search-box-button" type="submit" className={styles.search_icon}>
        {searchIcon}
      </button>
    </form>
  )
}
