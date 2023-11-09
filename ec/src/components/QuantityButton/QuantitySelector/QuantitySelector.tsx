import { Product } from "../../../context/StoreContext"
import QuantityButtonResult from "../QuantityButtonResult/QuantityButtonResult"
import styles from "./QuantitySelector.module.css"
import { useState } from "react"

interface Props {
  product: Product
  quantity: number
  setQuantity: (quantity: number) => void
}

export default function QuantitySelector({ product, quantity, setQuantity }: Props) {
  const [tooltipVisible, setTooltipVisible] = useState(false)
  const [invalidQuantity, setInvalidQuantity] = useState(false)

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Math.max(0, parseInt(event.target.value))
    setQuantity(newQuantity)

    if (newQuantity > product.stock) {
      setInvalidQuantity(true)
    } else {
      setInvalidQuantity(false)
    }
  }

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.tooltip} onMouseEnter={() => setTooltipVisible(true)} onMouseLeave={() => setTooltipVisible(false)}>
          <div className={styles.text_quantity}>Quantity</div>

          <input
            type="number"
            className={`${styles.quantity_input} ${invalidQuantity ? styles.invalid : ""}`}
            value={quantity}
            onChange={handleQuantityChange}
          />
        </div>
        {tooltipVisible && (
          <div className={`${styles.stock_available} ${invalidQuantity ? styles.invalidTooltip : ""}`}>Stock available: {product.stock}</div>
        )}
        <div>
          {Array.from({ length: product.stock }).map((_, id) => (
            <QuantityButtonResult key={id} value={id + 1} selectedQuantity={quantity} onSelect={(value: number) => setQuantity(value)} />
          ))}
        </div>
      </div>
    </div>
  )
}
