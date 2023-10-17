import { Product } from "../../../context/StoreContext"
import QuantityButtonResult from "./QuantityButtonResult/QuantityButtonResult"
import styles from "./QuantityButtonResults.module.css"
import { useState } from "react"

interface Props {
  product: Product
  selectedQuantity: number
  setSelectedQuantity: (quantity: number) => void
}

export default function QuantityButtonResults({ product, selectedQuantity, setSelectedQuantity }: Props) {
  const [dropdownOpen, setDropdownOpen] = useState(false)

  return (
    <div>
      <div className={styles.container}>
        <button className={styles.quantity_btn} onClick={() => setDropdownOpen(!dropdownOpen)}>
          Quantity: <div className={styles.selected_quantity}>{selectedQuantity}</div>
        </button>
        {dropdownOpen && (
          <div className={styles.dropdown}>
            {Array.from({ length: product.stock }).map((_, id) => (
              <QuantityButtonResult key={id} value={id + 1} selectedQuantity={selectedQuantity} setSelectedQuantity={setSelectedQuantity} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}