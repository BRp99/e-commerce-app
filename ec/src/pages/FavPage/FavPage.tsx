import { useFavContext } from "../../context/FavContext"
import { useStoreContext } from "../../context/StoreContext"
import { useEffect, useState } from "react"
import { heartIconNoFavPage, loadingIcon } from "../../icons/icons"
import BackButtonToHomePage from "../../utilities/BackButtonToHomePage"
import styles from "./FavPage.module.css"
import FavCard from "./FavCard/FavCard"

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
