import { NavLink, useParams } from "react-router-dom"
import styles from "./SearchPage.module.css"
import { Product, useStoreContext } from "../../context/StoreContext"
import { useEffect, useState } from "react"
import ProductCard from "../../components/ProductCard/ProductCard"
import { useFavContext } from "../../context/FavContext"
import { useCartContext } from "../../context/CartContext"
import { errorIcon, notFoundIcon } from "../../icons/icons"
import BackButtonToHomePage from "../../utilities/BackButtonToHomePage"

export default function SearchPage() {
  const { q } = useParams<string>()
  const [filteredProducts, setFilteredProducts] = useState([])
  const { error, loadingFetchProducts, products } = useStoreContext()
  const { favorites } = useFavContext()
  const { cartItems } = useCartContext()

  const fetchSearchResults = (query: string) => {
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
        setFilteredProducts([])
      })
  }
  useEffect(() => {
    if (q && q !== "") {
      fetchSearchResults(q)
    }
  }, [q])

  if (!favorites) {
    return <div className={styles.container_without_fav}></div>
  }

  if (error) {
    return (
      <div className={styles.container_error}>
        <div className={styles.icon}>{errorIcon}</div> <div className={styles.message}> Oops! Something went wrong.</div>
        <div className={styles.oops}> Please try again later. </div>
      </div>
    )
  }
  // console.error("Error:", error)

  if (loadingFetchProducts) {
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

  if (!products) {
    return (
      <div className={styles.not_found}>
        <div className={styles.icon}>{notFoundIcon}</div> <div className={styles.product_not_found}>Product not found!</div>
        <div className={styles.oops}> Oops! Looks like this product is currently unavailable. Please check again later!</div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      {/* <div className={styles.header}>
        <div className={styles.back_button}>
          <BackButtonToHomePage />
        </div>
      </div> */}
      {filteredProducts.length > 0 && <h1>Possible results for: "{q}"</h1>}
      <div>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product: Product) => (
            <ProductCard
              key={product.id}
              product={product}
              inFavorites={favorites.some((fav) => fav.productId === product.id)}
              inCart={cartItems.some((cartItems) => cartItems.productId === product.id)}
            />
          ))
        ) : (
          <div className={styles.not_found}>
            <div className={styles.icon}>{notFoundIcon}</div> <div className={styles.product_unavailable}> "{q}"</div>
            <div className={styles.oops}> Seems like this product doesn't exist.</div>
            <NavLink to={"/"} className={styles.nav_link}>
              Click here to check our products!
            </NavLink>
          </div>
        )}
      </div>
    </div>
  )
}
