import { useParams } from "react-router-dom"
import { useCartContext } from "../../context/CartContext"
import { useFavContext } from "../../context/FavContext"
import styles from "./ProductPage.module.css"
import ColorStarRating from "../../utilities/ColorStarRating"
import { useStoreContext, Product } from "../../context/StoreContext"
import { useEffect, useState } from "react"
import BackButtonToCategoryPage from "../../utilities/BackButtonToCategoryPage"
import { calculateDiscountedPrice } from "../../utilities/sharedFunctions"
import { errorIcon, heartIconAddFavorites, heartIconRemoveFavorites, notFoundIcon } from "../../icons/icons"

export default function ProductPage() {
  const { products, loadingFetchProducts } = useStoreContext()

  const { productId } = useParams<{ productId: string | undefined }>()

  const { addToCart, cartItems, removeFromCart } = useCartContext()
  const { addToFav, removeFavorite, favorites } = useFavContext()

  const [currentProduct, setCurrentProduct] = useState<Product | null>(null)
  const [imgClic, setImgClic] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])

  const fetchProducts = () => {
    setError(null)
    setLoading(true)
    fetch(`https://dummyjson.com/products`)
      .then((response) => response.json())
      .then((data) => {
        if (data && Array.isArray(data.products)) {
          setFilteredProducts(data.products)
        } else {
          setFilteredProducts([])
        }
      })
      .catch((error) => {
        console.error("Error find data:", error)
        setError("Error")
        setFilteredProducts([])
      })
      .finally(() => {
        setLoading(false)
      })
  }
  useEffect(() => {
    fetchProducts()
  }, [])

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

  return (
    <div>
      <BackButtonToCategoryPage category={currentProduct ? currentProduct.category : ""} />

      <div className={styles.container}>
        {currentProduct ? (
          <div className={styles.container_of_others_containers}>
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
            <div className={styles.container_thumbnail}>
              <img className={styles.img_thumbnail} src={selectedImage || currentProduct.thumbnail} alt={currentProduct.title} />
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
                  <ColorStarRating rating={currentProduct.rating} />
                  <div className={styles.number_rating}> {currentProduct.rating}</div>
                </div>
                <div className={styles.description}> {currentProduct.description.replaceAll(/[_\-\.]/g, "")}</div>

                <div className={styles.buttons}>
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
          <div className={styles.not_found}>
            <div className={styles.icon}>{notFoundIcon}</div> <div className={styles.product_not_found}>Product not found!</div>
            <div className={styles.oops}> Oops! Looks like this product is currently unavailable. Please check again later!</div>
          </div>
        )}
      </div>
    </div>
  )
}
