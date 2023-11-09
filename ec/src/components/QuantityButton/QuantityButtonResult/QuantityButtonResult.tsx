import styles from "./QuantityButtonResult.module.css"

interface Props {
  value: number
  selectedQuantity: number
  onSelect: (value: number) => void
}

export default function QuantityButtonResult({ value, selectedQuantity, onSelect }: Props) {
  const isSelected = value === selectedQuantity

  return <></>
}
