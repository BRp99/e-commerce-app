import { useStoreContext, Product } from "../../context/StoreContext"
import styles from "./HomePage.module.css"
import { getProductsWithMoreThan17Discount, getPromoProducts } from "../../utilities/sharedFunctions"
import { loadingIcon } from "../../icons/icons"
import PromotionCard from "../../components/PromotionCard/PromotionCard"
import CategoryCard from "../../components/CategoriesCard/CategoryCard"

export type CategoryThumbnails = Record<string, Product>

export default function HomePage() {
  const { products, loadingFetchProducts } = useStoreContext()

  const categoryThumbnails: CategoryThumbnails = {}

  if (loadingFetchProducts) {
    return (
      <div className={styles.loading_container}>
        <div className={styles.loading_svg}>
          {loadingIcon}

          <div className={styles.loading_string}>Loading...</div>
        </div>
      </div>
    )
  }

  if (!products) {
    return (
      <div>
        <div className={styles.error_loading}> Error loading products. Try again later </div>
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
