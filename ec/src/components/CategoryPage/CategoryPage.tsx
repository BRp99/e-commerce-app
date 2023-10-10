import { NavLink, useParams } from "react-router-dom"
import styles from "./CategoryPage.module.css"
import { useCartContext } from "../../context/CartContext"
import { useFavContext } from "../../context/FavContext"
import BackButtonToHomePage from "../../utilities/BackButtonToHomePage"
import { Product, useStoreContext } from "../../context/StoreContext"
import { heartIconAddProductAndCategoryPage, heartIconRemoveProductAndCategoryPage } from "../../icons/icons"
import { calculateDiscountedPrice } from "../../utilities/shareFunctions"

export default function CategoryPage() {
  const { category } = useParams<string>()

  const { addToCart, cartItems, removeFromCart } = useCartContext()
  const { products } = useStoreContext()
  const { addToFav, removeFavorite, favorites } = useFavContext()

  if (!favorites) return <>Loading...</>

  const isProductInFavorites = (productId: number) => favorites.some((favItem) => favItem.productId === productId)
  const isProductInCart = (productId: number) => cartItems.some((cartItem) => cartItem.productId === productId)

  if (!products) return <>Loading...</>

  const categoryProducts: Product[] = products.filter((product) => product.category === category)

  return (
    <div>
      <BackButtonToHomePage />

      <div className={styles.container}>
        <h3 className={styles.category_title}>{category?.replaceAll(/[_\-\.]/g, "")}</h3>

        <div className={styles.product_summary}>
          {categoryProducts.map((product, index) => (
            <div key={product.id} className={styles.product_item}>
              <div className={styles.product_item_content}>
                <NavLink key={product.id} to={`/product-promotion/${product.id}`} className={styles.product_item}>
                  <img className={styles.thumbnail} src={product.thumbnail} alt={product.title} />
                </NavLink>
                <div className={styles.product_title}>{product.title}</div>
                <div className={styles.container_price_container}>
                  <div className={styles.price_container}>
                    <div className={styles.discount}>${calculateDiscountedPrice(product)}</div>
                    <div className={styles.price}>${product.price}</div>
                  </div>
                </div>

                <button
                  className={styles.container_heart_icon}
                  onClick={() => {
                    if (isProductInFavorites(product.id)) {
                      removeFavorite(product.id)
                    } else {
                      addToFav(product.id)
                    }
                  }}
                >
                  {isProductInFavorites(product.id) ? heartIconAddProductAndCategoryPage : heartIconRemoveProductAndCategoryPage}
                </button>

                <div className={styles.container_btn_add}>
                  <button
                    className={`${styles.add_btn_cart} ${isProductInCart(product.id) ? styles.add_btn_cart_are_in_cart : ""} `}
                    onClick={() => {
                      if (isProductInCart(product.id)) {
                        removeFromCart(product.id)
                      } else {
                        addToCart(product.id)
                      }
                    }}
                  >
                    {isProductInCart(product.id) ? " Add item to cart" : " Add item to cart"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
