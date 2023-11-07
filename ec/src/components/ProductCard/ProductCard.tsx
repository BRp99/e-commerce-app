import styles from "./ProductCard.module.css"
import { Product, useStoreContext } from "../../context/StoreContext"
import { NavLink } from "react-router-dom"
import { calculateDiscountedPrice } from "../../utilities/sharedFunctions"
import { useFavContext } from "../../context/FavContext"
import { useCartContext } from "../../context/CartContext"
import ColorStarRating from "../../utilities/ColorStarRating"
import { errorIcon, heartIconAddFavorites, heartIconRemoveFavorites, notFoundIcon } from "../../icons/icons"

interface Props {
  product: Product
  inFavorites: boolean
  inCart: boolean
}

export default function ProductCard({ product, inFavorites, inCart }: Props) {
  const { addToFav, removeFavorite } = useFavContext()
  const { addToCart, removeFromCart } = useCartContext()
  const { error, loadingFetchProducts } = useStoreContext()

  function onFavClick() {
    inFavorites ? removeFavorite(product.id) : addToFav(product.id)
  }

  function onCartClick() {
    inCart ? removeFromCart(product.id) : addToCart(product.id)
  }

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

  if (!product) {
    return (
      <div className={styles.not_found}>
        <div className={styles.icon}>{notFoundIcon}</div> <div className={styles.product_not_found}>Product not found!</div>
        <div className={styles.oops}> Oops! Looks like this product is currently unavailable. Please check again later!</div>
      </div>
    )
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
