import styles from "./Header.module.css"
import { cartIcon, heartIcon, searchIcon } from "../icons/icons"
import { NavLink } from "react-router-dom"
import { useCartContext, Product } from "../context/CartContext"
import { useFavContext } from "../context/FavContext"
import { useState } from "react"
import SearchResultsList from "./SearchResultsList"

interface HeaderProps {
  openModal(): void
}

export default function Header({ openModal }: HeaderProps) {
  const { totalQuantityCart } = useCartContext()
  const { totalQuantityFav } = useFavContext()

  const [input, setInput] = useState("")
  const [results, setResults] = useState([])
  const [showResults, setShowResults] = useState(false)

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
          onBlur={() => setShowResults(false)}
          onChange={(e) => handleChange(e.target.value)}
        />
        <div className={styles.results_container}>
          <SearchResultsList results={results} />
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
