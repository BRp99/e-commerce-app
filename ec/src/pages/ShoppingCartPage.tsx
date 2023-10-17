import QuantityButton from "../components/QuantityButton/QuantityButton"
import { useCartContext } from "../context/CartContext"
import { Product, useStoreContext } from "../context/StoreContext"
import { cartIconShoppingCartPage } from "../icons/icons"
import BackButtonToHomePage from "../utilities/BackButtonToHomePage"
import { useState, useEffect } from "react"
import { calculateDiscountedPrice, getFirsts5ProductsWith17Discount, getProductsWithMoreThan17Discount } from "../utilities/shareFunctions"
import styles from "./ShoppingCartPage.module.css"

export default function ShoppingCartPage() {
  const [selectedQuantities, setSelectedQuantities] = useState<{ [productId: number]: number }>({})
  const { cartItems, removeFromCart } = useCartContext()
  const { products } = useStoreContext()
  const [totalItems, setTotalItems] = useState(0)

  // Função para calcular a soma total das quantidades
  const calculateTotalItems = (quantities: { [productId: number]: number }) => {
    const total = Object.values(quantities).reduce((acc, quantity) => acc + quantity, 0)
    setTotalItems(total)
  }

  useEffect(() => {
    // Redefina as quantidades selecionadas quando o carrinho for atualizado
    const initialQuantities: { [productId: number]: number } = {}
    cartItems.forEach((cartItem) => {
      initialQuantities[cartItem.productId] = cartItem.quantity
    })
    setSelectedQuantities(initialQuantities)
    // Calcula a soma total das quantidades
    calculateTotalItems(initialQuantities)
  }, [cartItems])

  // Use um efeito separado para calcular a soma das quantidades sempre que houver uma alteração
  useEffect(() => {
    const total = Object.values(selectedQuantities).reduce((acc, quantity) => acc + quantity, 0)
    setTotalItems(total)
  }, [selectedQuantities])

  // Função para remover um item do carrinho
  const handleRemoveFromCart = (productId: number) => {
    removeFromCart(productId)

    // Atualiza as quantidades selecionadas após a remoção
    const updatedQuantities = { ...selectedQuantities }
    delete updatedQuantities[productId]
    setSelectedQuantities(updatedQuantities)

    // Calcula a soma total atualizada
    calculateTotalItems(updatedQuantities)
  }

  if (!products) {
    return (
      <div>
        <BackButtonToHomePage />
        <p>Loading...</p>
      </div>
    )
  }

  const productsWithMoreThan17Discount: Product[] = getProductsWithMoreThan17Discount(products)
  const fiveProductsWithDiscount: Product[] = getFirsts5ProductsWith17Discount(productsWithMoreThan17Discount)

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

              const selectedQuantity = selectedQuantities[product.id] || 1
              return (
                <div key={product.id}>
                  <div key={product.id} className={styles.container_of_others_containers}>
                    <div className={styles.container_thumbnail}>
                      <img className={styles.img_thumb} src={product.thumbnail} alt={product.title} />
                    </div>
                    <div className={styles.container_info_product}>
                      <div className={styles.container_description}>
                        <div className={styles.description}> {product.description.replaceAll(/[_\.]/g, "")}</div>
                      </div>
                      {fiveProductsWithDiscount.includes(product) ? (
                        <>
                          <div className={styles.price_with_promo}>
                            <div className={styles.discount}>${calculateDiscountedPrice(product)}</div>
                            <div className={styles.price}>${product.price}</div>
                            <div className={styles.container_btn}>
                              <div>
                                <QuantityButton
                                  product={product}
                                  selectedQuantity={selectedQuantity}
                                  setSelectedQuantity={(quantity: number) =>
                                    setSelectedQuantities({
                                      ...selectedQuantities,
                                      [product.id]: quantity,
                                    })
                                  }
                                />
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
                              <QuantityButton
                                product={product}
                                selectedQuantity={selectedQuantity}
                                setSelectedQuantity={(quantity: number) =>
                                  setSelectedQuantities({
                                    ...selectedQuantities,
                                    [product.id]: quantity,
                                  })
                                }
                              />
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
                Saved with Promotions: <div>$number</div>{" "}
              </div>
              <div className={styles.total_items}>
                TOTAL items: <div>{totalItems}</div>{" "}
              </div>
              <div className={styles.all_taxes}>all taxes includes</div>
              <button>Buy</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
