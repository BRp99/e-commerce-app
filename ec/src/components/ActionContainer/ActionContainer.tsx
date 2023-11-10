import { NavLink } from "react-router-dom"
import styles from "./ActionContainer.module.css"
// import LoginButton from "../LoginButton/LoginButton"
// import LogOutButton from "../AuthButtonToggle/AuthButtonToggle"
import { useCartContext } from "../../context/CartContext"
import { useFavContext } from "../../context/FavContext"
import { cartIconHeader, hamburgerIcon, heartIconHeader } from "../../icons/icons"
import AuthButtonToggle from "../AuthButtonToggle/AuthButtonToggle"

interface Props {
  openModal(): void
}

export default function ActionContainer({ openModal }: Props) {
  const { totalQuantityFav } = useFavContext()
  const { totalQuantityCart } = useCartContext()

  return (
    <div className={styles.container}>
      {/* <LoginButton />
      <LogOutButton /> */}
      <AuthButtonToggle />

      {/* <button onClick={openModal} className={styles.login_btn}>
        <div className={styles.login_icon}> {logIcon} </div>
        <div className={styles.login_text}>Log in</div>
      </button> */}

      <NavLink to="/favorites" className={styles.fav_link}>
        {heartIconHeader}
        <div className={styles.quantity_fav}> {totalQuantityFav > 10 ? "10+" : totalQuantityFav} </div>
      </NavLink>

      <NavLink to="/cart" className={styles.cart_link}>
        {cartIconHeader}
        <div className={styles.quantity_cart}> {totalQuantityCart > 10 ? "10+" : totalQuantityCart} </div>
      </NavLink>

      {/* <button className={styles.hamburger}>{hamburgerIcon}</button> */}
    </div>
  )
}
