import { useParams } from "react-router-dom"
import styles from "./CategoriesPage.module.css"
import { useCartContext } from "../../context/CartContext"
import { useFavContext } from "../../context/FavContext"
import BackButtonToHomePage from "../../utilities/BackButtonToHomePage"
import { Product, useStoreContext } from "../../context/StoreContext"
import ProductCard from "../ProductCard/ProductCard"
import { errorIcon, notFoundIcon } from "../../icons/icons"

export default function CategoriesPage() {
  const { category } = useParams<string>()

  const { cartItems } = useCartContext()
  const { products, error, loadingFetchProducts } = useStoreContext()
  const { favorites } = useFavContext()

  const err = true

  if (error) {
    return (
      <div className={styles.container_error}>
        <div className={styles.icon}>{errorIcon}</div> <div className={styles.message}> Oops! Something went wrong.</div>
        <div className={styles.oops}> Please try again later. </div>
      </div>
    )
  }

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

  if (!products) {
    return (
      <div className={styles.container_not_found}>
        <div className={styles.icon}>{notFoundIcon}</div> <div className={styles.product_not_found}>Product not found!</div>
        <div className={styles.oops}> Oops! Looks like this product is currently unavailable. Please check again later!</div>
      </div>
    )
  }

  const isProductInFavorites = (productId: number) => (favorites || []).some((favItem) => favItem.productId === productId)
  const isProductInCart = (productId: number) => cartItems.some((cartItem) => cartItem.productId === productId)

  const categoryProducts: Product[] = products.filter((product) => product.category === category)

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.back_button}>
          <BackButtonToHomePage />
        </div>

        <h3 className={styles.category_title}>{category?.replaceAll(/[-]/g, " ")} </h3>
      </div>
      <div className={styles.container}>
        <div className={styles.product_summary}>
          {categoryProducts.map((product) => (
            <ProductCard key={product.id} product={product} inFavorites={isProductInFavorites(product.id)} inCart={isProductInCart(product.id)} />
          ))}
        </div>
      </div>
    </div>
  )
}
