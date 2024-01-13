import { NavLink } from "react-router-dom"
import { Product } from "../../../../context/StoreContext"
import styles from "./SearchResult.module.css"

interface Props {
  result: Product
  onProductSelected: () => void
}

export default function SearchResult({ result, onProductSelected }: Props) {
  return (
    <NavLink className={styles.container} to={"product/" + result.id} onClick={onProductSelected}>
      {result.title}
    </NavLink>
  )
}
