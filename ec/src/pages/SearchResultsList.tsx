import { Product } from "../context/CartContext"
import SearchResult from "./SearchResult"
import styles from "./SearchResultsList.module.css"

interface SearchResultsListProps {
  results: Product[]
  inputValue: string
  selectedResult: Product | null
}

export default function SearchResultsList({
  results,
  inputValue,
  selectedResult,
}: SearchResultsListProps) {
  return (
    <div className={styles.results_list}>
      {results.length > 0 ? (
        results.map((result, id) => (
          <SearchResult
            key={id}
            result={result}
            inputValue={inputValue}
            isSelected={result.id === selectedResult?.id}
          />
        ))
      ) : inputValue.trim() !== "" ? (
        <div className={styles.no_results_message}>
          No results found for{" "}
          <span className={styles.suggested_text}>"{inputValue}"</span>.
        </div>
      ) : null}
    </div>
  )
}
