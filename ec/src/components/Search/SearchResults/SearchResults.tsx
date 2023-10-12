import { Product } from "../../../context/StoreContext"
import { SearchResultsType } from "../Search"
import SearchResult from "./SearchResult/SearchResult"
import styles from "./SearchResults.module.css"

interface Props {
  results: SearchResultsType
  onProductSelected: () => void
}

export default function SearchResults({ results, onProductSelected }: Props) {
  if (results === "NoQuery") return <></>
  if (results === "Fetching") return <div className={styles.container}>Searching...</div>
  if (results === "Error") return <div className={styles.container}>There was an error. Please try again later.</div>
  if (results.length === 0) return <div className={styles.container}>No product matches query.</div>
  const list = results.map((v) => <SearchResult key={v.id} result={v} onProductSelected={onProductSelected} />)

  return <div className={styles.container}>{list}</div>
}
