import { NavLink, useParams } from "react-router-dom"
import { useCartContext } from "../../context/CartContext"
import { useFavContext } from "../../context/FavContext"
import styles from "./ProductPage.module.css"
import ColorStarRating from "../../utilities/ColorStarRating"
import { useStoreContext, Product } from "../../context/StoreContext"
import { useEffect, useState } from "react"
import BackButtonToCategoryPage from "../../utilities/BackButtonToCategoryPage"
import { calculateDiscountedPrice } from "../../utilities/sharedFunctions"
import { heartIconAddFavorites, heartIconRemoveFavorites, loadingIcon } from "../../icons/icons"

export default function ProductPage() {
  const { productId } = useParams<{ productId: string | undefined }>()

  const { addToCart, cartItems, removeFromCart } = useCartContext()
  const { products } = useStoreContext()
  const { addToFav, removeFavorite, favorites } = useFavContext()

  const [currentProduct, setCurrentProduct] = useState<Product | null>(null)
  const [imgClic, setImgClic] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  useEffect(() => {
    if (productId === undefined || !products) {
      setCurrentProduct(null)
    } else {
      const selectedProduct = products.find((p) => p.id === parseInt(productId))

      if (selectedProduct) {
        setCurrentProduct(selectedProduct)
      } else {
        setCurrentProduct(null)
      }
    }
  }, [productId, products])

  const isProductInFavorites = (productId: number) => (favorites || []).some((favItem) => favItem.productId === productId)
  const isProductInCart = (productId: number) => cartItems.some((cartItem) => cartItem.productId === productId)

  // if (loading) {
  //   return (
  //     <div className={styles.loading_container}>
  //       <div className={styles.loading_svg}>
  //         {loadingIcon}

  //         <div className={styles.loading_string}>Loading...</div>
  //       </div>
  //     </div>
  //   )
  // }

  // if (!products) {
  //   return (
  //     <div className={styles.loading_container}>
  //       <div className={styles.error_loading}>Error loading products. Try again later</div>
  //     </div>
  //   )
  // }

  return (
    <div>
      <BackButtonToCategoryPage category={currentProduct ? currentProduct.category : ""} />

      <div className={styles.container}>
        {currentProduct ? (
          <div className={styles.container_of_others_containers}>
            <div>
              <div className={`${styles.product_images} ${currentProduct.images.length > 3 ? `${styles.overscroll_container}` : ""}`}>
                {currentProduct.images.map((image, index) => (
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
            <div className={styles.container_thumbnail}>
              <img className={styles.img_thumbnail} src={selectedImage || currentProduct.thumbnail} alt={currentProduct.title} />

              <button
                className={styles.container_heart_icon}
                onClick={() => {
                  if (isProductInFavorites(currentProduct.id)) {
                    removeFavorite(currentProduct.id)
                  } else {
                    addToFav(currentProduct.id)
                  }
                }}
              >
                {isProductInFavorites(currentProduct.id) ? heartIconAddFavorites : heartIconRemoveFavorites}
              </button>
            </div>
            <div className={styles.container_info_product}>
              <div className={styles.info_product}>
                {currentProduct.discountPercentage > 0 ? (
                  <>
                    <div className={styles.product_discount}>${calculateDiscountedPrice(currentProduct)}</div>
                    <div className={styles.product_discount_info}> {currentProduct.discountPercentage}% off!</div>
                  </>
                ) : (
                  ""
                )}

                <div className={styles.title}>{currentProduct.title.replaceAll(/[_\-\.]/g, "")}</div>
                <div className={styles.rating}>
                  Rating of {currentProduct.rating}
                  <ColorStarRating rating={currentProduct.rating} />
                </div>
                <div className={styles.description}> {currentProduct.description.replaceAll(/[_\-\.]/g, "")}</div>

                <div>
                  <button
                    className={`${styles.add_btn_cart} ${isProductInCart(currentProduct.id) ? styles.add_btn_cart_are_in_cart : ""} `}
                    onClick={() => {
                      if (isProductInCart(currentProduct.id)) {
                        removeFromCart(currentProduct.id)
                      } else {
                        addToCart(currentProduct.id)
                      }
                    }}
                  >
                    {isProductInCart(currentProduct.id) ? " Remove" : " Buy"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>Product not found</div>
        )}
      </div>
    </div>
  )
}
