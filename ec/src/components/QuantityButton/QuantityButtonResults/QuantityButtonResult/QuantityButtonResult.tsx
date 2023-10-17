import styles from "./QuantityButtonResult.module.css"

interface Props {
  value: number
  selectedQuantity: number
  setSelectedQuantity: (quantity: number) => void
}

export default function QuantityButtonResult({ value, selectedQuantity, setSelectedQuantity }: Props) {
  return (
    <div className={`${styles.result} ${selectedQuantity === value ? styles.selected : ""}`} onClick={() => setSelectedQuantity(value)}>
      {value}
    </div>
  )
}
