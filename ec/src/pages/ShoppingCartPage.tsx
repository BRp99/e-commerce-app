import { useCartContext } from "../context/CartContext"
import { useStoreContext } from "../context/StoreContext"
import ButtonBack from "../utilities/ButtonBack"
import styles from "./ShoppingCartPage.module.css"

export default function ShoppingCartPage() {
  const { cartItems, increaseQuantityInCart, decreaseQuantityInCart, removeFromCart, totalQuantityCart } = useCartContext()

  const { products } = useStoreContext()

  const totalPrice = products ? cartItems.reduce((p, c) => p + products[c.productId].price * c.quantity, 0) : "-"

  return (
    <div>
      <ButtonBack />

      <div className={styles.container}>
        {products &&
          cartItems.map((cartItem) => {
            const product = products[cartItem.productId]
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
