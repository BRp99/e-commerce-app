import { useFavContext } from "../context/FavContext"
import { useStoreContext, Product } from "../context/StoreContext"
import { NavLink } from "react-router-dom"
import { useEffect, useState } from "react"
import { heartIconFavPage, heartIconNoFavPage, loadingIcon } from "../icons/icons"
import BackButtonToHomePage from "../utilities/BackButtonToHomePage"
import styles from "./FavPage.module.css"
import { calculateDiscountedPrice, getFirsts5ProductsWith17Discount, getProductsWithMoreThan17Discount } from "../utilities/shareFunctions"

export default function FavPage() {
  const [loading, setLoading] = useState(true)
  const { products } = useStoreContext()
  const { favorites, removeFavorite } = useFavContext()

  useEffect(() => {
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className={styles.loading_container}>
        <div className={styles.loading_svg}>
          {loadingIcon}

          <div className={styles.loading_string}>Loading...</div>
        </div>
      </div>
    )
  }

  if (!favorites) {
    return (
      <div className={styles.loading_container}>
        <div className={styles.error_loading}>Error loading favorites</div>
      </div>
    )
  }

  if (!products) {
    return (
      <div className={styles.loading_container}>
        <div className={styles.error_loading}>Error loading products. Try again later</div>
      </div>
    )
  }

  const productsWithMoreThan17Discount: Product[] = getProductsWithMoreThan17Discount(products)

  const fiveProductsWithDiscount: Product[] = getFirsts5ProductsWith17Discount(productsWithMoreThan17Discount)

  return (
    <div>
      <BackButtonToHomePage />

      <div className={favorites.length === 0 ? styles.container_without_fav : styles.container_with_fav}>
        {products && favorites.length === 0 ? (
          <div>
            <div className={styles.no_fav_heart}> {heartIconNoFavPage} </div>
            <div className={styles.no_fav_text}>There are no items saved yet</div>
          </div>
        ) : (
          products &&
          favorites.map((favorite) => {
            const product = products.find((v) => v.id === favorite.productId)
            if (!product) return null
            return (
              <div key={product.id} className={styles.wrapper}>
                <NavLink to={`/product/${product.id}`} className={styles.nav_link}>
                  <div className={styles.container_thumb}>
                    <img src={product.thumbnail} alt={product.title} className={styles.thumb} />
                    <button
                      className={styles.heart_icon}
                      onClick={(e) => {
                        e.preventDefault()
                        removeFavorite(product.id)
                      }}
                    >
                      {heartIconFavPage}
                    </button>
                  </div>
                </NavLink>

                <div className={styles.container_info_product}>
                  <div className={styles.title_price}>
                    {fiveProductsWithDiscount.includes(product) ? (
                      <>
                        <div className={styles.title}>{product.title.replaceAll(/[_\-\.]/g, "")} </div>

                        <div className={styles.price}> ${calculateDiscountedPrice(product)}</div>
                      </>
                    ) : (
                      <>
                        <div className={styles.title_without_discount}>{product.title.replaceAll(/[_\-\.]/g, "")} </div>

                        <div className={styles.price_without_discount}> ${product.price}</div>
                      </>
                    )}
                  </div>

                  <div className={styles.brand}> Brand: {product.brand.replaceAll(/[_\-\.]/g, "")} </div>

                  <div className={styles.description}>{product.description.replaceAll(/[_\-\.]/g, "")} </div>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
