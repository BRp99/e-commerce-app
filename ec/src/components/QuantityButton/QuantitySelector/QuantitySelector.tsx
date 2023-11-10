import { Product } from "../../../context/StoreContext"
import styles from "./QuantitySelector.module.css"
import { useEffect, useState } from "react"

interface Props {
  product: Product
  quantity: number
  setQuantity: (quantity: number) => void
}

export default function QuantitySelector({ product, quantity, setQuantity }: Props) {
  const [tooltipVisible, setTooltipVisible] = useState(false)
  const [invalidQuantity, setInvalidQuantity] = useState(false)

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Math.max(1, parseInt(event.target.value) || 1)
    setQuantity(newQuantity)

    if (newQuantity > product.stock) {
      setInvalidQuantity(true)
    } else {
      setInvalidQuantity(false)
    }
  }

  useEffect(() => {
    setInvalidQuantity(quantity > product.stock)
  }, [product.stock, quantity])

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
      </div>
    </div>
  )
}
