import { NavLink, useParams } from "react-router-dom"
import { useCartContext } from "../../context/CartContext"
import { useFavContext } from "../../context/FavContext"
import styles from "./ProductPage.module.css"
import ColorStarRating from "../../utilities/ColorStarRating"
import { heartIconAddProductAndCategoryPage, heartIconRemoveProductAndCategoryPage } from "../../icons/icons"
import { useStoreContext } from "../../context/StoreContext"
import { useState } from "react"
import BackButtonToCategoryPage from "../../utilities/BackButtonToCategoryPage"

export default function ProductPage() {
  const { productId } = useParams<{ productId: string | undefined }>()

  const { addToCart, cartItems, removeFromCart } = useCartContext()
  const { products } = useStoreContext()
  const { addToFav, removeFavorite, favorites } = useFavContext()

  const [imgClic, setImgClic] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  if (!favorites) return <>Loading...</>

  const isProductInFavorites = (productId: number) => favorites.some((favItem) => favItem.productId === productId)
  const isProductInCart = (productId: number) => cartItems.some((cartItem) => cartItem.productId === productId)

  if (productId === undefined) {
    return <div>Product not found</div>
  }

  const productIdAsInt = parseInt(productId, 10)

  if (!products) return <>Loading...</>

  const product = products.find((p) => p.id === productIdAsInt)

  if (!product) {
    return <div>Product not found.</div>
  }

  const discountedPrice = product.price - (product.price * product.discountPercentage) / 100

  return (
    <div>
      <BackButtonToCategoryPage category={product.category} />

      <div className={styles.container}>
        <div className={styles.container_of_others_containers}>
          <div className={styles.container_images_three}>
            <div className={styles.product_images_three}>
              {product.images.map((image, index) => (
                <img
                  key={`image-${index}`}
                  className={`${styles.images} ${selectedImage === image ? styles.selected : ""}`}
                  src={image}
                  alt={`Product Image ${index}`}
                  onClick={() => {
                    setImgClic(true)
                    setSelectedImage(image)
                  }}
                />
              ))}
            </div>
          </div>
          <div className={styles.container_thumbnail_three}>
            <img className={styles.img_thumbnail_three} src={selectedImage || product.thumbnail} alt={product.title} />

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
          </div>
          .
          <div className={styles.container_info_product_three}>
            <div className={styles.info_product}>
              <div className={styles.product_discount}>${discountedPrice.toFixed(2)}</div>
              <div className={styles.product_discount_info}>Promotion with 17% off!</div>
              <div className={styles.title}>{product.title.replaceAll(/[_\-\.]/g, "")}</div>
              <div className={styles.rating}>
                Rating of {product.rating}
                <ColorStarRating rating={product.rating} />
              </div>
              <div className={styles.description}> {product.description.replaceAll(/[_\-\.]/g, "")}</div>

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

              <div className={styles.nav_link_container}>
                <div className={styles.nav_link}>
                  <NavLink to={`/category/${product.category}`} className={styles.nav_link_category}>
                    See other products like this!
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
