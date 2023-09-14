import styles from "./Header.module.css"
import { cartIcon, heartIcon, searchIcon } from "../icons/icons"
import { NavLink } from "react-router-dom"
import { useCartContext } from "../context/CartContext"
import { useFavContext } from "../context/FavContext"

interface HeaderProps {
  openModal(): void
}

export default function Header({ openModal }: HeaderProps) {
  const { totalQuantityCart } = useCartContext()
  const { totalQuantityFav } = useFavContext()

  return (
    <div className={styles.container}>
      <NavLink to="/" className={styles.market_fusion}>
        MarketFusion
      </NavLink>

      <div className={styles.search_container}>
        <input
          className={styles.search_input}
          type="text"
          placeholder="What are you looking for?"
        />
        <button className={styles.search_btn}>
          {searchIcon}
          Search
        </button>
      </div>

      <div className={styles.action_container}>
        <button onClick={openModal} className={styles.log_btn}>
          Log in
        </button>

        <NavLink to={"/favorites"} className={styles.fav_link}>
          {heartIcon}
          <div className={styles.quantity_fav}> {totalQuantityFav} </div>
        </NavLink>

        <NavLink to="/shopping-cart" className={styles.cart_link}>
          {cartIcon}
          <div className={styles.quantity_cart}> {totalQuantityCart} </div>
        </NavLink>
      </div>
    </div>
  )
}
