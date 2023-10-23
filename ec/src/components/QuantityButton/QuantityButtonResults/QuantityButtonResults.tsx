import { Product } from "../../../context/StoreContext"
import QuantityButtonResult from "./QuantityButtonResult/QuantityButtonResult"
import styles from "./QuantityButtonResults.module.css"
import { useState } from "react"
import { useCartContext } from "../../../context/CartContext"

interface Props {
  product: Product
  quantity: number
  setQuantity: (quantity: number) => void
}

export default function QuantitySelector({ product, quantity, setQuantity }: Props) {
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const handleQuantityChange = (value: number) => {
    const newQuantity = Math.max(0, value)
    setQuantity(newQuantity)
    // setSelectedQuantity(newQuantity)
  }

  return (
    <div>
      <div className={styles.container}>
        <button className={styles.quantity_btn} onClick={() => setDropdownOpen(!dropdownOpen)}>
          Quantity: <div className={styles.selected_quantity}> {quantity}</div>
        </button>
        {dropdownOpen && (
          <div className={styles.dropdown}>
            {Array.from({ length: product.stock }).map((_, id) => (
              <QuantityButtonResult key={id} value={id + 1} selectedQuantity={quantity} onSelect={handleQuantityChange} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
