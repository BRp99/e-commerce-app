import { Product } from "../../context/StoreContext"
import styles from "./QuantityButton.module.css"
import QuantityButtonResults from "./QuantityButtonResults/QuantityButtonResults"

export type QuantityButtonType = Product[]

interface Props {
  product: Product
  updateQuantity: (productId: number, quantity: number) => void
}

export default function QuantityButton({ product, updateQuantity }: Props) {
  return (
    <div className={styles.container}>
      <QuantityButtonResults product={product} updateQuantity={updateQuantity} />
    </div>
  )
}
