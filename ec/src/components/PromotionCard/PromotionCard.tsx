import styles from "./PromotionCard.module.css"
import { Product, useStoreContext } from "../../context/StoreContext"
import { NavLink } from "react-router-dom"
import { errorIcon, notFoundIcon } from "../../icons/icons"

interface Props {
  id: number
  thumbnail: string
  brand: string
  product: Product
}

export default function PromotionCard({ thumbnail, brand, product }: Props) {
  const { loadingFetchProducts, error } = useStoreContext()
  const discountedPrice = product.price - (product.price * product.discountPercentage) / 100

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
      <div className={styles.container_not_found}>
        <div className={styles.icon}>{notFoundIcon}</div> <div className={styles.product_not_found}>Product not found!</div>
        <div className={styles.oops}> Oops! Looks like this product is currently unavailable. Please check again later!</div>
      </div>
    )
  }

  return (
    <NavLink key={product.id} to={`/product/${product.id}`} className={styles.container}>
      <div className={styles.thumbnail_container}>
        <img className={styles.thumbnail} src={thumbnail} alt={brand} />
      </div>
      <div className={styles.bottom}>
        <div className={styles.title}>{product.title.replaceAll(/[_\-\.]/g, "")} </div>
        <div className={styles.price_container}>
          <div className={styles.price}>${product.price}</div>
          <div className={styles.discount}>${discountedPrice.toFixed(2)}</div>
        </div>
      </div>
    </NavLink>
  )
}
