import { CategoryThumbnails } from "../../pages/HomePage"
import styles from "./CardCategory.module.css"
import { ProductFav } from "../../context/FavContext"

interface CategoriesProps {
  category: string
  thumbnail: CategoryThumbnails[string]["thumbnail"]
  product: ProductFav
}

export default function Categories({
  category,
  thumbnail,
  product,
}: CategoriesProps) {
  return (
    <div className={styles.container}>
      <div key={category}>
        <img className={styles.thumbnail} src={thumbnail} alt={category} />
      </div>

      <div className={styles.category_name}>
        {category.replaceAll(/[_\-\.]/g, "")}
      </div>
    </div>
  )
}
