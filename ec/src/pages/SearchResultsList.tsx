import { Product } from "../context/CartContext"
import SearchResult from "./SearchResult"
import styles from "./SearchResultsList.module.css"

interface SearchResultsListProps {
  results: Product[]
}

export default function SearchResultsList({ results }: SearchResultsListProps) {
  return (
    <div className={styles.results_list}>
      {results.map((result, id) => {
        return <SearchResult result={result} key={id} />
      })}
    </div>
  )
}
