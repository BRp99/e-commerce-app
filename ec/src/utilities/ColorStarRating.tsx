import { starIcon } from "../icons/icons"
import styles from "./ColorStarRating.module.css"

interface ColorStarRatingProps {
  rating: number
}

export default function ColorStarRating({ rating }: ColorStarRatingProps) {
  const iconArray = []
  const filledStars = Math.min(5, Math.floor(rating))
  const showFullStars = rating >= 4.6

  for (let i = 0; i < 5; i++) {
    const starStyle =
      i < filledStars || (i === 4 && showFullStars)
        ? styles.star_icon_filled
        : styles.star_icon_empty
    iconArray.push(
      <span key={i} className={starStyle}>
        {starIcon}
      </span>
    )
  }

  return <div>{iconArray}</div>
}
