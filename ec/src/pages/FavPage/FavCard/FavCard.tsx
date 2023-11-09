import { NavLink } from "react-router-dom"
import ColorStarRating from "../../../utilities/ColorStarRating"
import { calculateDiscountedPrice } from "../../../utilities/sharedFunctions"
import styles from "./FavCard.module.css"
import { Product } from "../../../context/StoreContext"
import { heartIconFavPage } from "../../../icons/icons"
import { useFavContext } from "../../../context/FavContext"

interface Props {
  product: Product
}

export default function FavCard({ product }: Props) {
  const { removeFavorite } = useFavContext()

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
