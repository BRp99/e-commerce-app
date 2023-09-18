import { NavLink } from "react-router-dom"
import { Product } from "../context/CartContext"
import styles from "./SearchResult.module.css"
import { useState } from "react"

interface SearchResult {
  result: Product
  inputValue: string
}

export default function SearchResult({ result, inputValue }: SearchResult) {
  console.log("Dados do resultado:", result)
  console.log("ID do resultado:", result.id)

  const [selectedResult, setSelectedResult] = useState<Product | null>(null)

  const highlightTitle = (title: string, inputValue: string) => {
    const regex = new RegExp(inputValue, "gi")
    return title.replace(
      regex,
      (match) => `<span class=${styles.highlight}>${match}</span>`
    )
  }

  return (
    <NavLink to={`/product/${result.id}`} className={styles.search_result}>
      <div
        dangerouslySetInnerHTML={{
          __html: highlightTitle(result.title, inputValue),
        }}
      ></div>
    </NavLink>
  )
}
