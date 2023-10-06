import { useFavContext } from "../context/FavContext"
import { useStoreContext } from "../context/StoreContext"
import { NavLink } from "react-router-dom"
import { heartIconFavPage, heartIconNoFavPage } from "../icons/icons"
import BackButtonToHomePage from "../utilities/BackButtonToHomePage"
import styles from "./FavPage.module.css"

export default function FavPage() {
  const { products } = useStoreContext()
  const { favorites, removeFavorite } = useFavContext()

  if (!favorites) return <>Loading...</>

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
                        console.log("Product:", product)
                        console.log("Removing product with ID:", product.id)
                        removeFavorite(product.id)
                      }}
                    >
                      {heartIconFavPage}
                    </button>
                  </div>
                </NavLink>

                <div className={styles.container_info_product}>
                  <div className={styles.title_price}>
                    <div className={styles.title}>{product.title.replaceAll(/[_\-\.]/g, "")} </div>

                    <div className={styles.price}> ${product.price}</div>
                  </div>
                  <div className={styles.brand}>{product.brand.replaceAll(/[_\-\.]/g, "")} </div>

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
