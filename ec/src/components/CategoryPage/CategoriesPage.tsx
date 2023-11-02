import { useParams } from "react-router-dom"
import styles from "./CategoriesPage.module.css"
import { useCartContext } from "../../context/CartContext"
import { useFavContext } from "../../context/FavContext"
import BackButtonToHomePage from "../../utilities/BackButtonToHomePage"
import { Product, useStoreContext } from "../../context/StoreContext"
import { useState, useEffect } from "react"
import { loadingIcon } from "../../icons/icons"
import ProductCard from "./ProductCard/ProductCard"

export default function CategoriesPage() {
  const [loading, setLoading] = useState(true)
  const { category } = useParams<string>()

  const { addToCart, cartItems, removeFromCart } = useCartContext()
  const { products } = useStoreContext()
  const { addToFav, removeFavorite, favorites } = useFavContext()

  useEffect(() => {
    setLoading(false)
  }, [])

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

  const isProductInFavorites = (productId: number) => (favorites || []).some((favItem) => favItem.productId === productId)
  const isProductInCart = (productId: number) => cartItems.some((cartItem) => cartItem.productId === productId)

  if (!products) {
    return (
      <div className={styles.loading_container}>
        <div className={styles.error_loading}> Error loading products. Try again later</div>
      </div>
    )
  }

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
