import styles from "./CardPromotion.module.css"
import { Product } from "../../context/StoreContext"

interface Props {
  id: number
  thumbnail: string
  brand: string
  product: Product
}

export default function CardPromotion({ id, thumbnail, brand, product }: Props) {
  const discountedPrice = product.price - (product.price * product.discountPercentage) / 100

  return (
    <div className={styles.container}>
      <div className={styles.container_off_others_containers}>
        <div key={id}>
          <div className={styles.best}>Best Promotion!</div>
          {/* <div className={styles.line}></div> */}

          {/* <div className={styles.percentage_off_container}>
            <div className={styles.seventeen}>{Math.floor(product.discountPercentage)}</div>
            <div className={styles.percentage_off}>%</div>
          </div> */}

          {/* <div className={styles.product_brand}>{brand.replaceAll(/[_\-\.]/g, "")} </div> */}
          <img className={styles.thumbnail} src={thumbnail} alt={brand} />

          <div className={styles.price_container}>
            <div className={styles.price}>${product.price}</div>

            <div className={styles.discount}>${discountedPrice.toFixed(2)}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
