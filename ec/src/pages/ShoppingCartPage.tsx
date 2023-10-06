import { useCartContext } from "../context/CartContext"
import { useStoreContext } from "../context/StoreContext"
import { cartIconShoppingCartPage } from "../icons/icons"
import BackButtonToHomePage from "../utilities/BackButtonToHomePage"
import styles from "./ShoppingCartPage.module.css"

export default function ShoppingCartPage() {
  const { cartItems, increaseQuantityInCart, decreaseQuantityInCart, removeFromCart } = useCartContext()

  const { products } = useStoreContext()

  if (!products) {
    return (
      <div>
        <BackButtonToHomePage />
        <p>Loading...</p>
      </div>
    )
  }

  const totalPrice = cartItems.reduce((p, c) => {
    const product = products[c.productId]

    if (product) {
      return p + product.price * c.quantity
    } else {
      return p
    }
  }, 0)

  return (
    <div>
      <BackButtonToHomePage />

      <div className={cartItems.length === 0 ? styles.container_without_products : styles.container_with_products}>
        {products && cartItems.length === 0 ? (
          <div>
            <div className={styles.no_cart_icon}> {cartIconShoppingCartPage} </div>
            <div className={styles.no_products_text}>Your cart is empty</div>
          </div>
        ) : (
          products &&
          cartItems.map((cartItem) => {
            const product = products.find((v) => v.id === cartItem.productId)
            if (!product) return null
            return (
              <div key={product.id} className={styles.flex_container}>
                <div className={styles.thumb_container}>
                  <img src={product.thumbnail} alt={product.title} className={styles.img_thumb} />
                  <div className={styles.btn}>
                    <button onClick={() => increaseQuantityInCart(product.id)}>+</button>
                    <p>Quantity: {cartItem.quantity}</p>
                    <button onClick={() => decreaseQuantityInCart(product.id)}>-</button>
                    <button onClick={() => removeFromCart(product.id)}>Remove Item</button>
                  </div>
                </div>

                <div className={styles.info_product}>
                  <h3>{product.title.replaceAll(/[_\-\.]/g, "")}</h3>
                  <p>Price: ${product.price}</p>
                </div>
                <div className={styles.total_price}>
                  <div>TOTAL = ${totalPrice}</div>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
