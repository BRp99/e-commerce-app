import { useState, useEffect, useRef } from "react"
import { NavLink } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import LoginButton from "../components/LoginButton/LoginButton"
import LogOutButton from "../components/LogOutButton/LogOutButton"
import SearchResultsList from "./SearchResultsList"
import styles from "./Header.module.css"
import { cartIconHeader, heartIconHeader, searchIcon } from "../icons/icons"
import { useCartContext } from "../context/CartContext"
import { useFavContext } from "../context/FavContext"
import { Product } from "../context/StoreContext"

interface HeaderProps {
  openModal(): void
}

export default function Header({ openModal }: HeaderProps) {
  const navigate = useNavigate()

  const { totalQuantityCart } = useCartContext()
  const { totalQuantityFav } = useFavContext()

  const [input, setInput] = useState("")
  const [results, setResults] = useState<Product[]>([])
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null)
  const [showNoResultsMessage, setShowNoResultsMessage] = useState(false)

  const [selectedResult, setSelectedResult] = useState<Product | null>(null)
  const [showResults, setShowResults] = useState(false)
  const [semanticallyRelatedResults, setSemanticallyRelatedResults] = useState<Product[]>([])

  const fetchData = (inputValue: string) => {
    fetch("https://dummyjson.com/products?limit=100")
      .then((response) => response.json())
      .then((data) => {
        console.log("API Data:", data)

        if (Array.isArray(data.products)) {
          const filteredResults = data.products.filter((product: Product) => {
            return product.title && product.title.toLowerCase().includes(inputValue.toLowerCase())
          })
          console.log("Filtered Results:", filteredResults)

          setResults(filteredResults)
        } else {
          console.error('The "products" property is not an array in the response:', data)
          setResults([])
          setShowNoResultsMessage(true)
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error)
      })
  }

  const handleResultClick = () => {
    console.log("Result clicked")
    if (selectedResult) {
      console.log("Selected Product:", selectedResult)
      console.log("Selected Product ID:", selectedProductId)

      navigate(`/product-promotion/${selectedProductId}`)
      setInput("")
      setShowResults(false)
    }
  }

  const handleChange = (inputValue: string) => {
    setInput(inputValue)
    if (inputValue.trim() === "") {
      setShowResults(false)
      setShowNoResultsMessage(false)
    } else {
      fetchData(inputValue)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log("Key pressed:", e.key)
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault()

      if (results.length > 0) {
        if (selectedProductId === null) {
          setSelectedProductId(results[0].id)
        } else {
          const currentIndex = results.findIndex((product) => product.id === selectedProductId)

          if (e.key === "ArrowDown") {
            const nextIndex = (currentIndex + 1) % results.length
            setSelectedProductId(results[nextIndex].id)
          } else if (e.key === "ArrowUp") {
            const prevIndex = (currentIndex - 1 + results.length) % results.length
            setSelectedProductId(results[prevIndex].id)
          }
        }
      }
    } else if (e.key === "Enter") {
      if (selectedResult) {
        handleResultClick()
      }
    }
  }

  const handleSearchBtnClick = () => {
    let productToNavigate = selectedResult || results[0]
    if (productToNavigate) {
      navigate(`/product-promotion/${productToNavigate.id}`)
      setInput("")
      setShowResults(false)
    }
  }

  const handleResultSelection = (productId: number) => {
    setSelectedProductId(productId)
    setSelectedResult(results.find((product) => product.id === productId) || null)
  }

  const performBtnSearch = (currentResults: Product[]) => {
    if (selectedProductId !== null && currentResults.length > 0) {
      const selectedProduct = currentResults.find((product) => product.id === selectedProductId)
      navigate(`/product-promotion/${selectedProductId}`)
      setInput("")
      setShowResults(false)
    }
  }

  useEffect(() => {
    const handleKeyDownEvent = (e: KeyboardEvent) => {
      handleKeyDown(e as any)
    }

    window.addEventListener("keydown", handleKeyDownEvent)
    return () => {
      window.removeEventListener("keydown", handleKeyDownEvent)
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
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearchBtnClick()
            }
          }}
        />
        <div className={styles.search_results_container}>
          {showResults ? (
            <SearchResultsList
              results={results}
              inputValue={input}
              selectedResult={selectedResult}
              onResultClick={handleResultClick}
              onResultSelection={handleResultSelection}
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

        <button className={styles.search_btn} onClick={handleSearchBtnClick}>
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
