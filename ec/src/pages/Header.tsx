import styles from "./Header.module.css"
import { cartIconHeader, heartIconHeader, searchIcon } from "../icons/icons"
import { NavLink } from "react-router-dom"
import { useCartContext } from "../context/CartContext"
import { useFavContext } from "../context/FavContext"
import { Product } from "../context/StoreContext"
import { useState, useEffect } from "react"
import SearchResultsList from "./SearchResultsList"
import { useNavigate } from "react-router-dom"
import LoginButton from "../components/LoginButton/LoginButton"
import LogOutButton from "../components/LogOutButton/LogOutButton"

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
  const [selectedResultIndex, setSelectedResultIndex] = useState<number | null>(null)
  const [showNoResultsMessage, setShowNoResultsMessage] = useState(false)
  const [semanticallyRelatedResults, setSemanticallyRelatedResults] = useState<Product[]>([])

  const fetchData = (inputValue: string) => {
    fetch("https://dummyjson.com/products?limit=100")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.products)) {
          const results = data.products.filter((product: Product) => {
            return inputValue && product && product.title && product.title.toLowerCase().includes(inputValue.toLowerCase())
          })
          console.log("Results filter:", results)
          setResults(results)
        } else {
          console.error('The "products" property is not an array in the response:', data)
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error)
      })
  }

  const handleChange = (inputValue: string) => {
    setInput(inputValue)
    if (inputValue.trim() === "") {
      setShowResults(false)
    } else {
      fetchData(inputValue)
      setShowResults(true)
    }
  }

  const handleResultClick = () => {
    if (input === "") {
      setShowNoResultsMessage(true)
    } else if (selectedResultIndex !== null) {
      const selectedProduct = results[selectedResultIndex]
      if (selectedProduct) {
        navigate(`/product/${selectedProduct.id}`)
      }
      setSelectedResult(null)
      setInput("")
      setShowResults(false)
    }
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedResultIndex((prevIndex) => {
        if (prevIndex === null || prevIndex === results.length - 1) {
          return 0
        } else {
          return prevIndex + 1
        }
      })
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedResultIndex((prevIndex) => {
        if (prevIndex === null || prevIndex === 0) {
          return results.length - 1
        } else {
          return prevIndex - 1
        }
      })
    } else if (e.key === "Enter") {
      if (selectedResultIndex !== null) {
        const selectedProduct = results[selectedResultIndex]
        if (selectedProduct) {
          navigate(`/product/${selectedProduct.id}`)
        }
      } else {
        handleResultClick()
      }
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [results])

  return (
    <div className={styles.container}>
      <NavLink to="/" className={styles.market_fusion}>
        <h1> MarketFusion</h1>
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
            <SearchResultsList results={results} inputValue={input} selectedResult={selectedResult} selectedResultIndex={selectedResultIndex} />
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

        <button className={styles.search_btn} onClick={handleResultClick}>
          {searchIcon}
          Search
        </button>
      </div>
      <div className={styles.action_container}>
        <LoginButton />
        <LogOutButton />

        <button onClick={openModal} className={styles.log_btn}>
          Log in
        </button>

        <NavLink to="/favorites" className={styles.fav_link}>
          {heartIconHeader}
          <div className={styles.quantity_fav}> {totalQuantityFav} </div>
        </NavLink>

        <NavLink to="/shopping-cart" className={styles.cart_link}>
          {cartIconHeader}
          <div className={styles.quantity_cart}> {totalQuantityCart} </div>
        </NavLink>
      </div>
    </div>
  )
}
