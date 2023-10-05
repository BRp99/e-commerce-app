import { NavLink } from "react-router-dom"
import { Product } from "../context/StoreContext"
import styles from "./SearchResult.module.css"

interface SearchResult {
  result: Product
  inputValue: string
  isSelected: boolean
}

export default function SearchResult({ result, inputValue, isSelected }: SearchResult) {
  console.log("Info about result:", result)
  console.log("ID result:", result.id)

  const highlightTitle = (title: string, inputValue: string) => {
    const regex = new RegExp(inputValue, "gi")
    return title.replace(regex, (match) => `<span class=${styles.highlight}>${match}</span>`)
  }

  return (
    <NavLink to={`/product-promotion/${result.id}`} className={`${styles.search_result} ${isSelected ? styles.selected : ""}`}>
      <div
        dangerouslySetInnerHTML={{
          __html: highlightTitle(result.title, inputValue),
        }}
      ></div>
    </NavLink>
  )
}
