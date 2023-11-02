import { useEffect, useState } from "react"
import { CartItem, useCartContext } from "../../context/CartContext"
import { Product, useStoreContext } from "../../context/StoreContext"
import { cartIconShoppingCartPage, garbageIcon, loadingIcon } from "../../icons/icons"
import BackButtonToHomePage from "../../utilities/BackButtonToHomePage"
import { calculateDiscountedPrice } from "../../utilities/sharedFunctions"
import styles from "./CartPage.module.css"
import QuantitySelector from "../../components/QuantityButton/QuantityButtonResults/QuantityButtonResults"
import FavCard from "../FavPage/FavCard/FavCard"
import CartProduct from "./CartProduct/CartProduct"

export default function ShoppingCartPage() {
  const [loading, setLoading] = useState(true)
  const [totalPrice, setTotalPrice] = useState<number>(0)

  const { cartItems, removeFromCart, setQuantity } = useCartContext()
  const { products } = useStoreContext()

  useEffect(() => {
    setLoading(false)
  }, [])

  useEffect(() => {
    if (products) {
      const newTotalPrice = calculateTotalPrice(cartItems, products)
      setTotalPrice(newTotalPrice)
    }
  }, [cartItems, products])

  if (loading) {
    return (
      <div className={styles.loading_container}>
        <div className={styles.loading_svg}>
          {loadingIcon}

          <div className={styles.loading_string}>Loading...</div>
        </div>
      </div>
    )
  }

  if (!products) {
    return (
      <div className={styles.loading_container}>
        <div className={styles.error_loading}> Error loading products. Try again later </div>
      </div>
    )
  }

  function calculateTotalPrice(cartItems: CartItem[], products: Product[]): number {
    let totalPrice = 0

    cartItems.forEach((cartItem) => {
      const product = products.find((p) => p.id === cartItem.productId)
      if (!product) return
      totalPrice += cartItem.quantity * calculateDiscountedPrice(product)
    })

    return totalPrice
  }

  const totalItems = cartItems.reduce((p, c) => p + c.quantity, 0)

  function calculateSavings(products: Product[], cartItems: CartItem[]) {
    return cartItems.reduce((p, c) => {
      const product = products.find((p) => p.id === c.productId)
      if (!product) return p
      const quantity = c.quantity
      return p + (product.price - calculateDiscountedPrice(product)) * quantity
    }, 0)
  }

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.back_button}>
          <BackButtonToHomePage />
        </div>
      </div>

      <div className={styles.main_container}>
        <div className={cartItems.length === 0 ? styles.container_without_products : styles.container_with_products}>
          {products && cartItems.length > 0 ? (
            cartItems.map((cartItem) => {
              const product = products.find((v) => v.id === cartItem.productId)
              if (!product) return null
              if (product) {
                return <CartProduct key={product.id} product={product} cartItem={cartItem} setQuantity={setQuantity} />
              }
            })
          ) : (
            <div>
              <div className={styles.no_cart_icon}> {cartIconShoppingCartPage} </div>
              <div className={styles.no_products_text}>Your cart is empty</div>
            </div>
          )}
        </div>
        {cartItems.length > 0 && (
          <div className={styles.container_order_summary}>
            {/* <div className={styles.info}> */}
            <div className={styles.order_summary}>Order Summary:</div>
            <div className={styles.saved_with}>
              <div className={styles.saved}>with Promotions:</div>
              <div className={styles.money_save}> ${calculateSavings(products, cartItems).toFixed(2)} </div>
            </div>

            <div className={styles.total_items}>
              Total items: <div>{totalItems}</div>
            </div>
            <div className={styles.total_price}>
              Total price: <div className={styles.number_total}> ${totalPrice.toFixed(2)} </div>
            </div>
            <div className={styles.all_taxes}>(all taxes includes)</div>
            <div className={styles.container_buy_btn}>
              <button className={styles.buy_btn}>Buy</button>
            </div>
          </div>
          // </div>
        )}
      </div>
    </div>
  )
}
