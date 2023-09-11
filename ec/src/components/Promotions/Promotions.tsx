import styles from "./Promotions.module.css"
import { heartIcon } from "../../icons/icons"

interface PromotionsProps {
  id: number
  thumbnail: string
  title: string
}

export default function Promotions({ id, thumbnail, title }: PromotionsProps) {
  return (
    <div className={styles.container}>
      <div key={id} className={styles.img_container}>
        <div className={styles.percentage_off_container}>
          <div className={styles.seventeen}>17</div>
          <div className={styles.percentage_off}>%</div>
        </div>

        <div className={styles.product_title}>{title} </div>
        <img
          className={styles.thumbnail}
          src={thumbnail}
          alt={title}
          width={220}
          height={150}
        />
        <button className={styles.heart_icon}>{heartIcon}</button>
      </div>
    </div>
  )
}
