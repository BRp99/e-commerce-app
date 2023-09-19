import styles from "./Header.module.css"
import { cartIcon, heartIcon, searchIcon } from "../icons/icons"
import { NavLink } from "react-router-dom"
import { useCartContext, Product } from "../context/CartContext"
import { useFavContext } from "../context/FavContext"
import { useState, useEffect } from "react"
import SearchResultsList from "./SearchResultsList"
import { useNavigate } from "react-router-dom"

interface HeaderProps {
  openModal(): void
}

export default function Header({ openModal }: HeaderProps) {
  const navigate = useNavigate()

  const { totalQuantityCart } = useCartContext()
  const { totalQuantityFav } = useFavContext()

  const [input, setInput] = useState("")
  const [results, setResults] = useState<Product[]>([])
  const [showResults, setShowResults] = useState(false)
  const [selectedResult, setSelectedResult] = useState<Product | null>(null)
  const [showNoResultsMessage, setShowNoResultsMessage] = useState(false)
  const [semanticallyRelatedResults, setSemanticallyRelatedResults] = useState<
    Product[]
  >([])

  const fetchData = (inputValue: string) => {
    fetch("https://dummyjson.com/products?limit=100")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.products)) {
          const results = data.products.filter((product: Product) => {
            return (
              inputValue &&
              product &&
              product.title &&
              product.title.toLowerCase().includes(inputValue.toLowerCase())
            )
          })
          console.log("Resultados filtrados:", results)
          setResults(results)
        } else {
          console.error(
            'The "products" property is not an array in the response:',
            data
          )
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error)
      })
  }

  const handleChange = (inputValue: string) => {
    setInput(inputValue)
    fetchData(inputValue)

    setShowResults(true)
  }

  const handleResultClick = () => {
    if (selectedResult) {
      navigate(`/product/${selectedResult.id}`)
      setSelectedResult(null)
      setInput("")
      setShowResults(false)
    } else {
      setShowNoResultsMessage(true)
    }
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      const currentIndex = results.findIndex(
        (result) => result.id === selectedResult?.id
      )
      const nextIndex =
        currentIndex === -1 ? 0 : (currentIndex + 1) % results.length
      setSelectedResult(results[nextIndex])
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      const currentIndex = results.findIndex(
        (result) => result.id === selectedResult?.id
      )
      const prevIndex =
        currentIndex === -1
          ? results.length - 1
          : (currentIndex - 1 + results.length) % results.length
      setSelectedResult(results[prevIndex])
    } else if (e.key === "Enter") {
      handleResultClick()
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [selectedResult, results])

  return (
    <div className={styles.container}>
      <NavLink to="/" className={styles.market_fusion}>
        MarketFusion
      </NavLink>
      <div className={styles.search_container}>
        <input
          className={styles.search_input}
          type="text"
          placeholder="What are you looking for?"
          value={input}
          onFocus={() => setShowResults(true)}
          onChange={(e) => handleChange(e.target.value)}
        />
        <div className={styles.search_results_container}>
          {showResults ? (
            <SearchResultsList
              results={results}
              inputValue={input}
              selectedResult={selectedResult}
            />
          ) : showNoResultsMessage ? (
            <div className={styles.no_results_message}>
              Product not found! Did you mean:
              {semanticallyRelatedResults.map((result, index) => (
                <span key={index} className={styles.suggested_text}>
                  {result.title}
                </span>
              ))}
            </div>
          ) : null}
        </div>
        <button className={styles.search_btn}>
          {searchIcon}
          Search
        </button>
      </div>
      <div className={styles.action_container}>
        <button onClick={openModal} className={styles.log_btn}>
          Log in
        </button>

        <NavLink to={"/favorites"} className={styles.fav_link}>
          {heartIcon}
          <div className={styles.quantity_fav}> {totalQuantityFav} </div>
        </NavLink>

        <NavLink to="/shopping-cart" className={styles.cart_link}>
          {cartIcon}
          <div className={styles.quantity_cart}> {totalQuantityCart} </div>
        </NavLink>
      </div>
    </div>
  )
}
