import QuantitySelector from "../../../components/QuantityButton/QuantityButtonResults/QuantityButtonResults"
import { CartItem, useCartContext } from "../../../context/CartContext"
import { Product, useStoreContext } from "../../../context/StoreContext"
import { errorIcon, garbageIcon, notFoundIcon } from "../../../icons/icons"
import { calculateDiscountedPrice } from "../../../utilities/sharedFunctions"
import styles from "./CartProduct.module.css"

interface Props {
  product: Product
  cartItem: CartItem
  setQuantity: (productId: number, quantity: number) => void
}

export default function CartProduct({ product, cartItem, setQuantity }: Props) {
  const { error, loadingFetchProducts } = useStoreContext()
  const { removeFromCart } = useCartContext()

  const err = true

  if (error) {
    return (
      <div className={styles.container_error}>
        <div className={styles.icon}>{errorIcon}</div> <div className={styles.message}> Oops! Something went wrong.</div>
        <div className={styles.oops}> Please try again later. </div>
      </div>
    )
  }
  // console.error("Error:", error)

  if (loadingFetchProducts) {
    return (
      <div className={styles.nm_loading}>
        <div className={styles.wrapper}>
          <span className={styles.circle}></span>
        </div>
        <div className={styles.text}>
          Loading in progress! <div className={styles.second_text}>Feel free to twiddle your thumbs and we'll have everything sorted shortly.</div>
        </div>
      </div>
    )
  }

  if (!cartItem) {
    return <div className={styles.container_without_fproducts}></div>
  }

  if (!product) {
    return (
      <div className={styles.not_found}>
        <div className={styles.icon}>{notFoundIcon}</div> <div className={styles.product_not_found}>Product not found!</div>
        <div className={styles.oops}> Oops! Looks like this product is currently unavailable. Please check again later!</div>
      </div>
    )
  }

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
