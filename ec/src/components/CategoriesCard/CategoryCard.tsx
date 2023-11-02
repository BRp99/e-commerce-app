import { CategoryThumbnails } from "../../pages/HomePage/HomePage"
import styles from "./CategoryCard.module.css"
import { Product } from "../../context/StoreContext"
import { NavLink } from "react-router-dom"

interface Props {
  category: string
  thumbnail: CategoryThumbnails[string]["thumbnail"]
  product: Product
}

export default function CategoryCard({ category, thumbnail }: Props) {
  return (
    <NavLink key={category} to={`/categories/${category}`} className={styles.container}>
      <div key={category}>
        <img className={styles.thumbnail} src={thumbnail} alt={category} />
      </div>

      <div className={styles.category_name}>{category.replaceAll("-", " ")}</div>
    </NavLink>
  )
}
