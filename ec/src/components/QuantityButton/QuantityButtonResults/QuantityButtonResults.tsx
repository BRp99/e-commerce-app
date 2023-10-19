import { Product } from "../../../context/StoreContext"
import QuantityButtonResult from "./QuantityButtonResult/QuantityButtonResult"
import styles from "./QuantityButtonResults.module.css"
import { useState } from "react"
import { useCartContext } from "../../../context/CartContext"

interface Props {
  product: Product
  updateQuantity: (productId: number, quantity: number) => void
}

export default function QuantityButtonResults({ product, updateQuantity }: Props) {
  const { updateTotalQuantityCart } = useCartContext()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [selectedQuantity, setSelectedQuantity] = useState(0)

  const handleQuantityChange = (value: number) => {
    const newQuantity = Math.max(0, value)
    setSelectedQuantity(newQuantity)
    updateQuantity(product.id, newQuantity)
    updateTotalQuantityCart()
  }

  return (
    <div>
      <div className={styles.container}>
        <button className={styles.quantity_btn} onClick={() => setDropdownOpen(!dropdownOpen)}>
          Quantity: <div className={styles.selected_quantity}> {selectedQuantity}</div>
        </button>
        {dropdownOpen && (
          <div className={styles.dropdown}>
            {Array.from({ length: product.stock }).map((_, id) => (
              <QuantityButtonResult key={id} value={id + 1} selectedQuantity={selectedQuantity} onSelect={handleQuantityChange} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
