import { CategoryThumbnails } from "../../pages/HomePage"
import styles from "./Categories.module.css"
import { heartIcon } from "../../icons/icons"

interface CategoriesProps {
  category: string
  thumbnail: CategoryThumbnails[string]["thumbnail"]
}

export default function Categories({ category, thumbnail }: CategoriesProps) {
  return (
    <div className={styles.container}>
      <div key={category} className={styles.img_container}>
        <img
          className={styles.thumbnail}
          src={thumbnail}
          alt={category}
          width={220}
          height={150}
        />
        <button className={styles.heart_icon}>{heartIcon}</button>

        <div className={styles.category_name}> {category} </div>
      </div>
    </div>
  )
}
