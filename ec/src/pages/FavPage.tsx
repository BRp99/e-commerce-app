import { useFavContext } from "../context/FavContext"
import { useStoreContext } from "../context/StoreContext"
import { NavLink } from "react-router-dom"
import ButtonBack from "../utilities/ButtonBack"
import styles from "./FavPage.module.css"

export default function FavPage() {
  const { favorites, removeFavorites } = useFavContext()
  const { products } = useStoreContext()

  if (!favorites) return <>Loading...</>

  const heartIcon = (
    <svg height="2rem" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="orangered" fill="orangered">
      <path d="M12 6.00019C10.2006 3.90317 7.19377 3.25510 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.27530 13.7994 3.90317 12 6.00019Z" />
    </svg>
  )

  const heartIconNoFav = (
    <svg height="12rem" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="orangered" fill="orangered">
      <path d="M12 6.00019C10.2006 3.90317 7.19377 3.25510 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.27530 13.7994 3.90317 12 6.00019Z" />
    </svg>
  )

  return (
    <div>
      <ButtonBack />
      <div className={favorites.length === 0 ? styles.container_without_fav : styles.container_with_fav}>
        {products && favorites.length === 0 ? (
          <div className={styles.no_favorites_container}>
            <div className={styles.no_fav_heart}> {heartIconNoFav} </div>
            <div className={styles.no_fav_text}>There are no items saved yet</div>
          </div>
        ) : (
          products &&
          favorites.map((favorite) => {
            const product = products[favorite.productId]
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
                        removeFavorites(product.id)
                      }}
                    >
                      {heartIcon}
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
