import { useCartContext } from "../context/CartContext"
import { useStoreContext } from "../context/StoreContext"
import ButtonBack from "../utilities/ButtonBack"
import styles from "./ShoppingCartPage.module.css"

export default function ShoppingCartPage() {
  const { cartItems, increaseQuantityInCart, decreaseQuantityInCart, removeFromCart, totalQuantityCart } = useCartContext()

  const { products } = useStoreContext()

  if (!products) {
    return (
      <div>
        <ButtonBack />
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
      <ButtonBack />

      <div className={styles.container}>
        {cartItems.map((cartItem) => {
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
            </div>
          )
        })}
        <div>
          TOTAL = ${totalPrice} for {totalQuantityCart} item
        </div>
      </div>
    </div>
  )
}
