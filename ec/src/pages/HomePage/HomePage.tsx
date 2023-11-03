import { useStoreContext, Product } from "../../context/StoreContext"
import styles from "./HomePage.module.css"
import { getProductsWithMoreThan17Discount, getPromoProducts } from "../../utilities/sharedFunctions"
import PromotionCard from "../../components/PromotionCard/PromotionCard"
import CategoryCard from "../../components/CategoriesCard/CategoryCard"
import { errorIcon, notFoundIcon } from "../../icons/icons"

export type CategoryThumbnails = Record<string, Product>

export default function HomePage() {
  const { products, loadingFetchProducts, error } = useStoreContext()

  const categoryThumbnails: CategoryThumbnails = {}

  const err = true

  if (error) {
    return (
      <div className={styles.container_error}>
        <div className={styles.icon}>{errorIcon}</div> <div className={styles.message}> Oops! Something went wrong.</div>
        <div className={styles.oops}> Please try again later. </div>
      </div>
    )
  }
  // console.error("Error:", error)

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

  products.forEach((product) => {
    if (!categoryThumbnails[product.category]) {
      categoryThumbnails[product.category] = product
    }
  })

  const productsWithMoreThan17Discount: Product[] = getProductsWithMoreThan17Discount(products)

  const promoProducts: Product[] = getPromoProducts(productsWithMoreThan17Discount, 4)

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <div className={styles.hero_section}>
          {/* <div className={styles.hero_logo}>{logoIcon}</div> */}
          {/* <div className={styles.hero_logo}>あ</div> */}
          <div className={styles.hero_text}>it's the simple things</div>
          <div className={styles.glow_pink} />
          <div className={styles.glow_blue} />
          <div className={styles.glow_yellow} />
        </div>
        <div className={styles.container_promotions}>
          {promoProducts.map((product, i) => (
            <PromotionCard key={i} id={product.id} thumbnail={product.thumbnail} brand={product.brand} product={product as Product} />
          ))}
        </div>
      </div>

      {/* CARDCATEGORY */}
      <div className={styles.container_categories}>
        {Object.keys(categoryThumbnails).map((category) => (
          <CategoryCard
            key={category}
            category={category}
            thumbnail={categoryThumbnails[category].thumbnail}
            product={categoryThumbnails[category] as Product}
          />
        ))}
      </div>
    </div>
  )
}
