import { useEffect, useRef } from "react"
import { Product } from "../context/StoreContext"
import SearchResult from "./SearchResult"
import styles from "./SearchResultsList.module.css"

interface SearchResultsListProps {
  results: Product[]
  inputValue: string
  selectedResult: Product | null
  selectedResultIndex: number | null
}

export default function SearchResultsList({ results, inputValue, selectedResultIndex }: SearchResultsListProps) {
  const listRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (selectedResultIndex !== null && listRef.current) {
      const selectedResultElement = listRef.current.children[selectedResultIndex] as HTMLElement
      if (selectedResultElement) {
        const listHeight = listRef.current.clientHeight
        const elementHeight = selectedResultElement.clientHeight
        const elementOffsetTop = selectedResultElement.offsetTop

        const scrollPosition = elementOffsetTop - (listHeight - elementHeight) / 2

        listRef.current.scrollTop = scrollPosition
      }
    }
  }, [selectedResultIndex])

  const filteredResults = results
    .filter((result) => result.title.toLowerCase().includes(inputValue.toLowerCase()))
    .sort((a, b) => {
      const indexA = a.title.toLowerCase().indexOf(inputValue.toLowerCase())
      const indexB = b.title.toLowerCase().indexOf(inputValue.toLowerCase())

      return indexA - indexB
    })

  const showNoResultsMessage = inputValue.trim() !== "" && filteredResults.length === 0

  const listClassName = `${styles.results_list} ${filteredResults.length > 0 ? "has_results" : ""} ${
    filteredResults.length < 5 ? styles.less_results : ""
  }`

  return (
    <div className={listClassName} ref={listRef}>
      {/* <div tabIndex={0} className={styles.focusable_element}></div> */}
      {filteredResults.length > 0
        ? filteredResults.map((result, id) => (
            <SearchResult
              key={id}
              result={result}
              inputValue={inputValue}
              // isSelected={result.id === selectedResult?.id}
              isSelected={id === selectedResultIndex}
            />
          ))
        : null}
      {showNoResultsMessage && (
        <div className={styles.no_results_message}>
          No results found for <span className={styles.suggested_text}>"{inputValue}"</span>
        </div>
      )}
    </div>
  )
}
