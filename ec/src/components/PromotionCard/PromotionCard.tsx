import styles from "./PromotionCard.module.css"
import { Product } from "../../context/StoreContext"
import { NavLink } from "react-router-dom"

interface Props {
  id: number
  thumbnail: string
  brand: string
  product: Product
}

export default function PromotionCard({ id, thumbnail, brand, product }: Props) {
  const discountedPrice = product.price - (product.price * product.discountPercentage) / 100

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
