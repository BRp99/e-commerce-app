import styles from "./Header.module.css"
import { cartIcon, heartIcon, searchIcon } from "../icons/icons"
import { NavLink } from "react-router-dom"

interface HeaderProps {
  openModal(): void
}

export default function Header({ openModal }: HeaderProps) {
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
        <div className={styles.fav_link}> {heartIcon} </div>
        <div className={styles.cart_link}>{cartIcon}</div>
      </div>

      {/* <div className={styles.cart}>
        <div>7</div>
        <FavIcon />
        <CartIcon />
      </div> */}
    </div>
  )
}
