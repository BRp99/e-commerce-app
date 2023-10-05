import { CategoryThumbnails } from "../../pages/HomePage"
import styles from "./CardCategory.module.css"
import { Product } from "../../context/StoreContext"

interface CardCategoriesProps {
  category: string
  thumbnail: CategoryThumbnails[string]["thumbnail"]
  product: Product
}

export default function Categories({ category, thumbnail, product }: CardCategoriesProps) {
  return (
    <div className={styles.container}>
      <div key={category}>
        <img className={styles.thumbnail} src={thumbnail} alt={category} />
      </div>

      <div className={styles.category_name}>{category.replaceAll(/[_\.]/g, "")}</div>
    </div>
  )
}
