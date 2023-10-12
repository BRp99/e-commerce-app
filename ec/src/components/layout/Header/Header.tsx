import { NavLink } from "react-router-dom"
import LoginButton from "../../LoginButton/LoginButton"
import LogOutButton from "../../LogOutButton/LogOutButton"
import styles from "./Header.module.css"
import { cartIconHeader, heartIconHeader } from "../../../icons/icons"
import { useCartContext } from "../../../context/CartContext"
import { useFavContext } from "../../../context/FavContext"
import Search from "../../Search/Search"

interface HeaderProps {
  openModal(): void
}

export default function Header({ openModal }: HeaderProps) {
  const { totalQuantityCart } = useCartContext()
  const { totalQuantityFav } = useFavContext()

  return (
    <div className={styles.container}>
      <NavLink to="/" className={styles.market_fusion}>
        <h1> MarketFusion</h1>
      </NavLink>
      <Search />
      <div className={styles.action_container}>
        <LoginButton />
        <LogOutButton />

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
