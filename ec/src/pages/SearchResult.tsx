import { Product } from "../context/CartContext"
import styles from "./SearchResult.module.css"

interface SearchResult {
  result: Product
}

export default function SearchResult({ result }: SearchResult) {
  return (
    <div
      className={styles.search_result}
      onClick={(e) => alert(`You click on ${result.title}`)}
    >
      {" "}
      {result.title}{" "}
    </div>
  )
}
