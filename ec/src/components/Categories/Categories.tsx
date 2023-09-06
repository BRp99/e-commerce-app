import { CategoryThumbnails } from "../../pages/HomePage"
import styles from "./Categories.module.css"

interface CategoriesProps {
  category: string
  thumbnail: CategoryThumbnails[string]["thumbnail"]
}

export default function Categories({ category, thumbnail }: CategoriesProps) {
  return (
    <div className={styles.container}>
      <div key={category}>
        <img
          className={styles.thumbnail}
          src={thumbnail}
          alt={category}
          width={220}
          height={150}
        />

        <div className={styles.category_name}> {category} </div>
      </div>
    </div>
  )
}
