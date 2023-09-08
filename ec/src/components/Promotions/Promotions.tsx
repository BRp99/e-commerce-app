import styles from "./Promotions.module.css"

interface PromotionsProps {
  id: number
  thumbnail: string
  title: string
}

export default function Promotions({ id, thumbnail, title }: PromotionsProps) {
  return (
    <div className={styles.container}>
      <div key={id}>
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
      </div>
    </div>
  )
}
