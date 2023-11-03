import { CategoryThumbnails } from "../../pages/HomePage/HomePage"
import styles from "./CategoryCard.module.css"
import { Product, useStoreContext } from "../../context/StoreContext"
import { NavLink } from "react-router-dom"
import { errorIcon, notFoundIcon } from "../../icons/icons"

interface Props {
  category: string
  thumbnail: CategoryThumbnails[string]["thumbnail"]
  product: Product
}

export default function CategoryCard({ category, thumbnail, product }: Props) {
  const { error, loadingFetchProducts } = useStoreContext()

  if (error) {
    return (
      <div className={styles.container_error}>
        <div className={styles.icon}>{errorIcon}</div> <div className={styles.message}> Oops! Something went wrong.</div>
        <div className={styles.oops}> Please try again later. </div>
      </div>
    )
  }
  console.error("Error:", error)

  // const err = true

  if (loadingFetchProducts) {
    return (
      <div className={styles.nm_loading}>
        <div className={styles.wrapper}>
          <span></span>
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
    <NavLink key={category} to={`/categories/${category}`} className={styles.container}>
      <div key={category}>
        <img className={styles.thumbnail} src={thumbnail} alt={category} />
      </div>

      <div className={styles.category_name}>{category.replaceAll("-", " ")}</div>
    </NavLink>
  )
}
