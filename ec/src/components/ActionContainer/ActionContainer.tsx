import { NavLink } from "react-router-dom"
import styles from "./ActionContainer.module.css"
import LoginButton from "../LoginButton/LoginButton"
import LogOutButton from "../LogOutButton/LogOutButton"
import { useCartContext } from "../../context/CartContext"
import { useFavContext } from "../../context/FavContext"
import { cartIconHeader, heartIconHeader } from "../../icons/icons"

interface Props {
  openModal(): void
}

export default function ActionContainer({ openModal }: Props) {
  const { totalQuantityFav } = useFavContext()
  const { totalQuantityCart } = useCartContext()

  return (
    <div>
      <div className={styles.container}>
        {/* <LoginButton />
        <LogOutButton /> */}

        <button onClick={openModal} className={styles.log_btn}>
          Log in
        </button>

        <NavLink to="/favorites" className={styles.fav_link}>
          {heartIconHeader}
          <div className={styles.quantity_fav}> {totalQuantityFav} </div>
        </NavLink>

        <NavLink to="/shopping-cart" className={styles.cart_link}>
          {cartIconHeader}
          <div className={styles.quantity_cart}> {totalQuantityCart} </div>
        </NavLink>
      </div>
    </div>
  )
}
