import styles from "./QuantityButtonResult.module.css"

interface Props {
  value: number
  selectedQuantity: number
  onSelect: (value: number) => void
}

export default function QuantityButtonResult({ value, selectedQuantity, onSelect }: Props) {
  // className={`${styles.result} ${selectedQuantity === value ? styles.selected : ""}`} onClick={() => setSelectedQuantity(value)}

  const isSelected = value === selectedQuantity

  return (
    <div className={`${styles.result} ${isSelected ? styles.selected : ""}`} onClick={() => onSelect(value)}>
      {value}
    </div>
  )
}
