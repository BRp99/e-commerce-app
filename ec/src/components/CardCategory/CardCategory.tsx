import { CategoryThumbnails } from "../../pages/HomePage"
import styles from "./CardCategory.module.css"
import { Product } from "../../context/FavContext"
import { useFavContext } from "../../context/FavContext"

interface CategoriesProps {
  category: string
  thumbnail: CategoryThumbnails[string]["thumbnail"]
  product: Product
}

const heartIcon = (
  <svg
    height="2rem"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    stroke="orangered"
    fill="currentColor"
  >
    <path d="M12 6.00019C10.2006 3.90317 7.19377 3.25510 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.27530 13.7994 3.90317 12 6.00019Z" />
  </svg>
)

export default function Categories({
  category,
  thumbnail,
  product,
}: CategoriesProps) {
  const { addToFav } = useFavContext()

  return (
    <div className={styles.container}>
      <div key={category}>
        <img className={styles.thumbnail} src={thumbnail} alt={category} />
      </div>
      <button className={styles.heart_icon} onClick={() => addToFav(product)}>
        {heartIcon}
      </button>
      <div className={styles.category_name}>
        {category.replaceAll("-", " ")}
      </div>
    </div>
  )
}
