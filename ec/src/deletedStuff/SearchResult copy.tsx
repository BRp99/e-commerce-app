import { NavLink } from "react-router-dom"
import { Product } from "../context/StoreContext"
import styles from "./SearchResult.module.css"

interface SearchResult {
  results: Product
  inputValue: string
  isSelected: boolean
  onClick: () => void
  onKeyDown: (e: React.KeyboardEvent) => void
  onSelection: () => void
}

export default function SearchResult({ results, inputValue, isSelected, onClick, onKeyDown, onSelection }: SearchResult) {
  const highlightTitle = (title: string, inputValue: string) => {
    const regex = new RegExp(inputValue, "gi")
    return title.replace(regex, (match) => `<span class=${styles.highlight}>${match}</span>`)
  }

  const handleSearchResultKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault()

      if (e.key === "ArrowDown") {
        onSelection()
      } else if (e.key === "ArrowUp") {
        onSelection()
      }
    } else if (e.key === "Enter") {
      onClick()
    }
  }

  return (
    <NavLink
      to={`/product-promotion/${results.id}`}
      className={`${styles.search_result} ${isSelected ? styles.selected : ""}`}
      onClick={onClick}
      onKeyDown={handleSearchResultKeyDown}
      tabIndex={0}
    >
      <div
        dangerouslySetInnerHTML={{
          __html: highlightTitle(results.title, inputValue),
        }}
      ></div>
    </NavLink>
  )
}
