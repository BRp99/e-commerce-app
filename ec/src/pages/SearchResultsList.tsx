import { useEffect, useRef } from "react"
import { Product } from "../context/StoreContext"
import SearchResult from "./SearchResult"
import styles from "./SearchResultsList.module.css"

interface SearchResultsListProps {
  results: Product[]
  inputValue: string
  selectedResult: Product | null
  onResultClick: () => void
  onResultSelection: (productId: number) => void
}

export default function SearchResultsList({ results, inputValue, selectedResult, onResultClick, onResultSelection }: SearchResultsListProps) {
  const listRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (selectedResult && listRef.current) {
      const selectedResultIndex = results.findIndex((result) => result.id === selectedResult.id)
      if (selectedResultIndex !== -1) {
        const selectedResultElement = listRef.current.children[selectedResultIndex] as HTMLElement
        if (selectedResultElement) {
          const listHeight = listRef.current.clientHeight
          const elementHeight = selectedResultElement.clientHeight
          const elementOffsetTop = selectedResultElement.offsetTop

          const scrollPosition = elementOffsetTop - (listHeight - elementHeight) / 2

          listRef.current.scrollTop = scrollPosition
        }
      }
    }
  }, [selectedResult, results])

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

  const onResultKeyDown = (e: React.KeyboardEvent, productId: number) => {
    // Alterar o argumento para o ID do produto
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault()

      if (e.key === "ArrowDown") {
        const selectedResultIndex = results.findIndex((result) => result.id === selectedResult?.id)
        if (selectedResultIndex < results.length - 1) {
          onResultSelection(results[selectedResultIndex + 1].id) // Alterar o argumento para o ID do próximo produto
        }
      } else if (e.key === "ArrowUp") {
        const selectedResultIndex = results.findIndex((result) => result.id === selectedResult?.id)
        if (selectedResultIndex > 0) {
          onResultSelection(results[selectedResultIndex - 1].id) // Alterar o argumento para o ID do produto anterior
        }
      }
    } else if (e.key === "Enter") {
      if (selectedResult) {
        onResultClick()
      }
    }
  }

  return (
    <div className={listClassName} ref={listRef}>
      {filteredResults.length > 0
        ? filteredResults.map((results, id) => (
            <SearchResult
              key={results.id}
              results={results}
              inputValue={inputValue}
              isSelected={selectedResult?.id === results.id}
              onClick={onResultClick}
              onKeyDown={(e) => onResultKeyDown(e, results.id)}
              onSelection={() => onResultSelection(results.id)}
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
