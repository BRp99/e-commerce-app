import QuantitySelector from "../../../components/QuantityButton/QuantitySelector/QuantitySelector"
import { CartItem, useCartContext } from "../../../context/CartContext"
import { Product } from "../../../context/StoreContext"
import { garbageIcon } from "../../../icons/icons"
import { calculateDiscountedPrice } from "../../../utilities/sharedFunctions"
import styles from "./CartProduct.module.css"

interface Props {
  product: Product
  cartItem: CartItem
  setQuantity: (productId: number, quantity: number) => void
}

export default function CartProduct({ product, cartItem, setQuantity }: Props) {
  const { removeFromCart } = useCartContext()

  return (
    <div key={product.id} className={styles.container}>
      <div className={styles.container_thumbnail}>
        <img className={styles.img_thumb} src={product.thumbnail} alt={product.title} />
      </div>
      <div className={styles.container_info_product}>
        {product.discountPercentage > 0 ? (
          <>
            <div className={styles.price_with_promo}>
              <div className={styles.title}>{product.title}</div>

              <div className={styles.price}>${product.price}</div>
              <div className={styles.discount}>${calculateDiscountedPrice(product)}</div>
            </div>
            <div className={styles.description}> {product.description.replaceAll(/[_]/g, "")}</div>

            <div className={styles.container_btn}>
              <div>
                <QuantitySelector
                  product={product}
                  quantity={cartItem.quantity}
                  setQuantity={(quantity: number) => setQuantity(product.id, quantity)}
                />
              </div>
              <div>
                <button className={styles.remove_btn} onClick={() => removeFromCart(product.id)}>
                  {garbageIcon} Remove
                </button>
              </div>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  )
}
