import { starIcon } from "../icons/icons"
import styles from "./ColorStarRating.module.css"

export default function ColorStarRating({ rating }: { rating: number }) {
  return (
    <div className={styles.container}>
      <span className={rating >= 1 ? styles.filled : ""}>{starIcon}</span>
      <span className={rating >= 2 ? styles.filled : ""}>{starIcon}</span>
      <span className={rating >= 3 ? styles.filled : ""}>{starIcon}</span>
      <span className={rating >= 4 ? styles.filled : ""}>{starIcon}</span>
      <span className={rating >= 5 ? styles.filled : ""}>{starIcon}</span>
    </div>
  )
}
