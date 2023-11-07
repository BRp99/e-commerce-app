import styles from "./Hero.module.css"
import PromotionCard from "../../../components/PromotionCard/PromotionCard"
import { Product, useStoreContext } from "../../../context/StoreContext"
import { getProductsWithMoreThan17Discount, getPromoProducts } from "../../../utilities/sharedFunctions"
import { errorIcon, notFoundIcon } from "../../../icons/icons"

interface Props {
  products: Product[]
}

export default function Hero({ products }: Props) {
  const productsWithMoreThan17Discount: Product[] = getProductsWithMoreThan17Discount(products)
  const { error, loadingFetchProducts } = useStoreContext()

  const promoProducts: Product[] = getPromoProducts(productsWithMoreThan17Discount, 4)

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

  if (!products) {
    return (
      <div className={styles.not_found}>
        <div className={styles.icon}>{notFoundIcon}</div> <div className={styles.product_not_found}>Product not found!</div>
        <div className={styles.oops}> Oops! Looks like this product is currently unavailable. Please check again later!</div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.promos}>
        {promoProducts.map((product, i) => (
          <PromotionCard key={i} id={product.id} thumbnail={product.thumbnail} brand={product.brand} product={product as Product} />
        ))}
      </div>
      <div className={styles.hero_section}>
        <div className={styles.hero_text}>it's the simple things</div>
        <div className={styles.glow_pink} />
        <div className={styles.glow_blue} />
        <div className={styles.glow_yellow} />
      </div>
    </div>
  )
}
