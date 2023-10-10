import styles from "./CardPromotion.module.css"
import { Product } from "../../context/StoreContext"

interface CardPromotionsProps {
  id: number
  thumbnail: string
  brand: string
  product: Product
}

export default function CardPromotion({ id, thumbnail, brand, product }: CardPromotionsProps) {
  const discountedPrice = product.price - (product.price * product.discountPercentage) / 100

  return (
    <div className={styles.container}>
      <div key={id} className={styles.container_info}>
        <div className={styles.more_then}>More than</div>

        <div className={styles.percentage_off_container}>
          <div className={styles.seventeen}>{Math.floor(product.discountPercentage)}</div>
          <div className={styles.percentage_off}>%</div>
        </div>

        <div className={styles.product_brand}>{brand.replaceAll(/[_\-\.]/g, "")} </div>
        <img className={styles.thumbnail} src={thumbnail} alt={brand} />

        <div className={styles.price_container}>
          <div className={styles.discount}>${discountedPrice.toFixed(2)}</div>
          <div className={styles.price}>${product.price}</div>
        </div>
      </div>
    </div>
  )
}
