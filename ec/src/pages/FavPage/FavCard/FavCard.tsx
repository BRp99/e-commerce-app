import { NavLink } from "react-router-dom"
import ColorStarRating from "../../../utilities/ColorStarRating"
import { calculateDiscountedPrice } from "../../../utilities/sharedFunctions"
import styles from "./FavCard.module.css"
import { Product, useStoreContext } from "../../../context/StoreContext"
import { errorIcon, heartIconFavPage, heartIconNoFavPage, notFoundIcon } from "../../../icons/icons"
import { FavItem, useFavContext } from "../../../context/FavContext"

interface Props {
  product: Product
  favorites: FavItem
}

export default function FavCard({ product, favorites }: Props) {
  const { removeFavorite } = useFavContext()
  const { error, loadingFetchProducts } = useStoreContext()

  if (error) {
    return (
      <div className={styles.container_error}>
        <div className={styles.icon}>{errorIcon}</div> <div className={styles.message}> Oops! Something went wrong.</div>
        <div className={styles.oops}> Please try again later. </div>
      </div>
    )
  }

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
    return <></>
  }

  if (!product) {
    return (
      <div className={styles.not_found}>
        <div className={styles.icon}>{notFoundIcon}</div> <div className={styles.product_not_found}>Product not found!</div>
        <div className={styles.oops}> Oops! Looks like this product is currently unavailable. Please check again later!</div>
      </div>
    )
  }

  return (
    <div key={product.id} className={styles.container}>
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
          {product.discountPercentage > 0 ? (
            <>
              <div className={styles.title}>{product.title.replaceAll(/[_\-\.]/g, "")}</div>

              <div className={styles.price_container}>
                <div className={styles.price}>${product.price}</div>

                <div className={styles.discount}> ${calculateDiscountedPrice(product)}</div>
              </div>
            </>
          ) : (
            ""
          )}
        </div>

        <div className={styles.rating}>
          <ColorStarRating rating={product.rating} />
          <div className={styles.number_rating}>{product.rating}</div>
        </div>

        <div className={styles.description}>{product.description.replaceAll(/[_\-\.]/g, "")}</div>
      </div>
    </div>
  )
}
