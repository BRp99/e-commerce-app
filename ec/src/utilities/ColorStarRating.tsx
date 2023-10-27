import { starIcon } from "../icons/icons"
import styles from "./ColorStarRating.module.css"

export default function ColorStarRating() {
  return (
    <div>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i}>{starIcon}</span>
      ))}
    </div>
  )
}
