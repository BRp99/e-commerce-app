import { useCartContext } from "../context/CartContext"
import ButtonBack from "../utilities/ButtonBack"
import styles from "./ShoppingCartPage.module.css"

export default function ShoppingCartPage() {
  const {
    cartItems,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
    totalQuantityCart,
    totalPriceCart,
  } = useCartContext()

  return (
    <div>
      <ButtonBack />

      <div className={styles.container}>
        {cartItems.map((item) => (
          <div key={item.id} className={styles.flex_container}>
            <div className={styles.thumb_container}>
              <img
                src={item.thumbnail}
                alt={item.title}
                className={styles.img_thumb}
              />
              <div className={styles.btn}>
                <button onClick={() => increaseCartQuantity(item.id)}>+</button>
                <p>Quantity: {item.quantity}</p>
                <button onClick={() => decreaseCartQuantity(item.id)}>-</button>
                <button onClick={() => removeFromCart(item.id)}>
                  Remove Item
                </button>
              </div>
            </div>

            <div className={styles.info_product}>
              <h3>{item.title.replaceAll(/[_\-\.]/g, "")}</h3>
              <p>Price: ${item.price}</p>
            </div>
          </div>
        ))}
        <div>
          TOTAL = ${totalPriceCart} for {totalQuantityCart} item
        </div>
      </div>
    </div>
  )
}
