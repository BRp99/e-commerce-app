import { NavLink, useParams } from "react-router-dom"
import styles from "./SearchPage.module.css"
import { Product, useStoreContext } from "../../context/StoreContext"
import { useEffect, useState } from "react"
import ProductCard from "../../components/ProductCard/ProductCard"
import { useFavContext } from "../../context/FavContext"
import { useCartContext } from "../../context/CartContext"
import { errorIcon, notFoundIcon } from "../../icons/icons"

export default function SearchPage() {
  const { q } = useParams<string>()
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const { favorites } = useFavContext()
  const { cartItems } = useCartContext()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchSearchResults = (query: string) => {
    setError(null)
    setLoading(true)
    fetch(`https://dummyjson.com/products/search?q=${query}`)
      .then((response) => response.json())
      .then((data) => {
        if (data && Array.isArray(data.products)) {
          setFilteredProducts(data.products)
        } else {
          setFilteredProducts([])
        }
      })
      .catch((error) => {
        console.error("Error find data:", error)
        setError("Error")
        setFilteredProducts([])
      })
      .finally(() => {
        setLoading(false)
      })
  }
  useEffect(() => {
    if (q && q !== "") {
      fetchSearchResults(q)
    }
  }, [q])

  if (loading) {
    return (
      <div className={styles.nm_loading}>
        <div className={styles.wrapper}>
          <span className={styles.circle}></span>
        </div>
        <div className={styles.text}>
          Loading in progress! <div className={styles.second_text}>Feel free to twiddle your thumbs and we'll have everything sorted shortly.</div>
        </div>
      </div>
    )
  }

  if (filteredProducts.length === 0) {
    return (
      <div className={styles.container_not_found}>
        <div className={styles.icon}>{notFoundIcon}</div>
        <div className={styles.product_not_found}>No results for "{q}"</div>
        <div className={styles.oops}>Oops! Looks like this products is currently unavailable. Please check again later!</div>
        <NavLink to={"/"} className={styles.nav_link}>
          Go back
        </NavLink>
      </div>
    )
  }

  if (!favorites) {
    return <></>
  }
  if (error) {
    return (
      <div className={styles.container_error}>
        <div className={styles.icon}>{errorIcon}</div> <div className={styles.message}> Oops! Something went wrong.</div>
        <div className={styles.oops}> Please try again later. </div>
      </div>
    )
  }

  return (
    <div>
      <div className={styles.container}>
        {filteredProducts.length > 0 && (
          <div className={styles.results}>
            {filteredProducts.length} results for: "{q}"
          </div>
        )}
      </div>
      <div className={styles.grid_items}>
        {filteredProducts && filteredProducts.length > 0 ? (
          filteredProducts.map((product: Product) => (
            <ProductCard
              key={product.id}
              product={product}
              inFavorites={favorites.some((fav) => fav.productId === product.id)}
              inCart={cartItems.some((cartItems) => cartItems.productId === product.id)}
            />
          ))
        ) : (
          <div className={styles.container_product_not_found}>
            <div className={styles.not_found}>
              <div className={styles.icon}>{notFoundIcon}</div> <div className={styles.product_unavailable}> "{q}"</div>
              <div className={styles.oops}> Seems like this products doesn't exist.</div>
              <NavLink to={"/"} className={styles.nav_link}>
                Click here to check our products!
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
