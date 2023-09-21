import { starIcon } from "../icons/icons"
import styles from "./ColorStarRating.module.css"

interface ColorStarRatingProps {
  rating: number
}

export default function ColorStarRating({ rating }: ColorStarRatingProps) {
  const shouldAnimate = rating >= 3.5 && rating <= 5

  return (
    <div>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`${styles.star_icon} ${
            shouldAnimate ? styles.bounce : ""
          }`}
        >
          {starIcon}
        </span>
      ))}
    </div>
  )
}
