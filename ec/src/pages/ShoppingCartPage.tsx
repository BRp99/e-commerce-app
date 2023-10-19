import { useEffect, useState } from "react"
import QuantityButton from "../components/QuantityButton/QuantityButton"
import { useCartContext } from "../context/CartContext"
import { Product, useStoreContext } from "../context/StoreContext"
import { cartIconShoppingCartPage, loadingIcon } from "../icons/icons"
import BackButtonToHomePage from "../utilities/BackButtonToHomePage"
import { calculateDiscountedPrice, getFirsts5ProductsWith17Discount, getProductsWithMoreThan17Discount } from "../utilities/shareFunctions"
import styles from "./ShoppingCartPage.module.css"

export default function ShoppingCartPage() {
  const [loading, setLoading] = useState(true)
  const [selectedQuantities, setSelectedQuantities] = useState<Record<number, number>>({})
  const [totalPrice, setTotalPrice] = useState<number>(0)

  const { cartItems, removeFromCart } = useCartContext()
  const { products } = useStoreContext()

  useEffect(() => {
    setLoading(false)
  }, [])

  useEffect(() => {
    // Ccalcula o preço total com base nas quantidades selecionadas
    if (products) {
      const newTotalPrice = calculateTotalPrice(selectedQuantities, products)
      setTotalPrice(newTotalPrice)
    }
  }, [selectedQuantities, products])

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

  function calculateTotalPrice(selectedQuantities: Record<number, number>, products: Product[]): number {
    let totalPrice = 0

    for (const productId in selectedQuantities) {
      if (selectedQuantities.hasOwnProperty(productId)) {
        const quantity = selectedQuantities[productId]
        const product = products.find((p) => p.id === parseInt(productId, 10))

        if (product) {
          if (fiveProductsWithDiscount.includes(product)) {
            totalPrice += calculateDiscountedPrice(product) * quantity
          } else {
            totalPrice += product.price * quantity
          }
        }
      }
    }

    return totalPrice
  }

  // Atualiz a quant.
  const updateQuantity = (productId: number, quantity: number) => {
    setSelectedQuantities((prevSelectedQuantities) => ({
      ...prevSelectedQuantities,
      [productId]: quantity,
    }))
  }

  const productsWithMoreThan17Discount: Product[] = getProductsWithMoreThan17Discount(products)
  const fiveProductsWithDiscount: Product[] = getFirsts5ProductsWith17Discount(productsWithMoreThan17Discount)

  const totalItems = Object.values(selectedQuantities).reduce((acc: number, quantity) => acc + quantity, 0)

  function calculateSavings(products: Product[], selectedQuantities: Record<number, number>) {
    return products.reduce((totalSavings, product) => {
      const quantity = selectedQuantities[product.id] || 0
      return totalSavings + (product.price - calculateDiscountedPrice(product)) * quantity
    }, 0)
  }

  const handleRemoveFromCart = (productId: number) => {
    setSelectedQuantities((prevSelectedQuantities) => {
      const updatedQuantities = { ...prevSelectedQuantities }
      delete updatedQuantities[productId]
      return updatedQuantities
    })

    removeFromCart(productId)
  }

  return (
    <div>
      <BackButtonToHomePage />

      <div className={styles.main_container}>
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
                <div key={product.id}>
                  <div key={product.id} className={styles.container_of_others_containers}>
                    <div className={styles.container_thumbnail}>
                      <img className={styles.img_thumb} src={product.thumbnail} alt={product.title} />
                    </div>
                    <div className={styles.container_info_product}>
                      <div className={styles.container_description}>
                        <div className={styles.description}> {product.description.replaceAll(/[_]/g, "")}</div>
                      </div>
                      {fiveProductsWithDiscount.includes(product) ? (
                        <>
                          <div className={styles.price_with_promo}>
                            <div className={styles.discount}>${calculateDiscountedPrice(product)}</div>
                            <div className={styles.price}>${product.price}</div>
                            <div className={styles.container_btn}>
                              <div>
                                <QuantityButton product={product} updateQuantity={updateQuantity} />
                              </div>
                              <div>
                                <button className={styles.remove_btn} onClick={() => handleRemoveFromCart(product.id)}>
                                  Remove Item
                                </button>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className={styles.price_no_promo}>
                          <div className={styles.price_without_promo}> ${product.price}</div>
                          <div className={styles.container_btn}>
                            <div>
                              <QuantityButton product={product} updateQuantity={updateQuantity} />
                            </div>
                            <div>
                              <button className={styles.remove_btn} onClick={() => handleRemoveFromCart(product.id)}>
                                Remove Item
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
        {cartItems.length > 0 && (
          <div className={styles.container_order_summary}>
            <div className={styles.info}>
              <div className={styles.order_summary}>Order Summary:</div>
              <div className={styles.saved_with}>
                <div className={styles.saved}>Saved</div> <div className={styles.with_promotions}> with Promotions:</div>
                <div className={styles.money_save}> ${calculateSavings(fiveProductsWithDiscount, selectedQuantities).toFixed(2)} </div>
              </div>
              <div className={styles.total_items}>
                Total items: <div>{totalItems}</div>
              </div>
              <div className={styles.total_price}>
                Total price: <div className={styles.total}> ${totalPrice.toFixed(2)} </div>
              </div>
              <div className={styles.all_taxes}>(all taxes includes)</div>
              <div className={styles.container_buy_btn}>
                <button className={styles.buy_btn}>Buy</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
