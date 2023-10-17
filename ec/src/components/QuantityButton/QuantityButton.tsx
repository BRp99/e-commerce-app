import { Product } from "../../context/StoreContext"
import styles from "./QuantityButton.module.css"
import QuantityButtonResults from "./QuantityButtonResults/QuantityButtonResults"

export type QuantityButtonType = Product[]

interface Props {
  product: Product
  selectedQuantity: number
  setSelectedQuantity: (quantity: number) => void
}

export default function QuantityButton({ product, selectedQuantity, setSelectedQuantity }: Props) {
  return (
    <div className={styles.container}>
      <QuantityButtonResults product={product} selectedQuantity={selectedQuantity} setSelectedQuantity={setSelectedQuantity} />
    </div>
  )
}
