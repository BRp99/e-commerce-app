import styles from "./ProductCard.module.css"
import { Product } from "../../../context/StoreContext"
import { NavLink } from "react-router-dom"
import { calculateDiscountedPrice } from "../../../utilities/sharedFunctions"
import { useFavContext } from "../../../context/FavContext"
import { useCartContext } from "../../../context/CartContext"
import ColorStarRating from "../../../utilities/ColorStarRating"
import { heartIconAddFavorites, heartIconRemoveFavorites } from "../../../icons/icons"

interface Props {
  product: Product
  inFavorites: boolean
  inCart: boolean
}

export default function ProductCard({ product, inFavorites, inCart }: Props) {
  const { addToFav, removeFavorite } = useFavContext()
  const { addToCart, removeFromCart } = useCartContext()

  function onFavClick() {
    inFavorites ? removeFavorite(product.id) : addToFav(product.id)
  }

  function onCartClick() {
    inCart ? removeFromCart(product.id) : addToCart(product.id)
  }

  return (
    <div className={styles.container}>
      <NavLink key={product.id} to={`/product/${product.id}`} className={styles.thumbnail_container}>
        <img className={styles.thumbnail} src={product.thumbnail} alt={product.title} />
      </NavLink>
      <div className={styles.rating}>
        <ColorStarRating rating={product.rating} />
        <div className={styles.number_rating}> {product.rating}</div>
      </div>

      <div className={styles.product_title}>{product.title}</div>

      <div className={styles.container_price_container}>
        {product.discountPercentage > 0 ? (
          <>
            <div className={styles.price_container}>
              <div className={styles.price}>${product.price}</div>
              <div className={styles.discount}>${calculateDiscountedPrice(product)}</div>
            </div>
          </>
        ) : (
          <div className={styles.price_container_no_promo}>
            <div className={styles.price_no_promo}>${product.price}</div>
          </div>
        )}
      </div>
      <div className={styles.buttons}>
        <button className={styles.container_heart_icon} onClick={onFavClick}>
          {inFavorites ? heartIconAddFavorites : heartIconRemoveFavorites}
        </button>
        <div className={styles.container_btn_add}>
          <button className={`${styles.add_btn_cart} ${inCart ? styles.add_btn_cart_are_in_cart : ""} `} onClick={onCartClick}>
            {inCart ? "Remove" : "Buy"}
          </button>
        </div>
      </div>
    </div>
  )
}
