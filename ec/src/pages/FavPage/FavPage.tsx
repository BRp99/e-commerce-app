import { useFavContext } from "../../context/FavContext"
import { useStoreContext } from "../../context/StoreContext"
import { errorIcon, heartIconNoFavPage, notFoundIcon } from "../../icons/icons"
import BackButtonToHomePage from "../../utilities/BackButtonToHomePage"
import styles from "./FavPage.module.css"
import FavCard from "./FavCard/FavCard"

export default function FavPage() {
  const { products, error, loadingFetchProducts } = useStoreContext()
  const { favorites } = useFavContext()

  const err = true

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

  if (!favorites) {
    return <div className={styles.container_without_fav}></div>
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
    <div>
      <div className={styles.header}>
        <div className={styles.back_button}>
          <BackButtonToHomePage />
        </div>
      </div>

      <div className={favorites.length === 0 ? styles.container_without_fav : styles.container_with_fav}>
        {products && favorites.length > 0 ? (
          favorites.map((favorite) => {
            const product = products.find((p) => p.id === favorite.productId)
            if (!product) return
            if (product) {
              return <FavCard key={product.id} product={product} favorites={favorite} />
            }
          })
        ) : (
          <div>
            <div className={styles.no_fav_heart}> {heartIconNoFavPage} </div>
            <div className={styles.no_fav_text}>There are no items saved yet</div>
          </div>
        )}
      </div>
    </div>
  )
}
