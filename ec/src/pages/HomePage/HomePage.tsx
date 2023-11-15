import { useStoreContext, Product } from "../../context/StoreContext"
import styles from "./HomePage.module.css"
import CategoryCard from "../../components/CategoriesCard/CategoryCard"
import { errorIcon, notFoundIcon } from "../../icons/icons"
import Hero from "./Hero/Hero"

export type CategoryThumbnails = Record<string, Product>

export default function HomePage() {
  const { products, loadingFetchProducts, error } = useStoreContext()

  const categoryThumbnails: CategoryThumbnails = {}

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
      <div className={styles.container_not_found}>
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

  return (
    <div className={styles.container}>
      <Hero products={products} />

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
