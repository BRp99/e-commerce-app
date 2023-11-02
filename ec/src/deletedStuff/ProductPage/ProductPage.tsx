import { useParams, NavLink } from "react-router-dom"
import { useCartContext } from "../../context/CartContext"
import { useFavContext } from "../../context/FavContext"
import styles from "./ProductPage.module.css"
import { useState } from "react"
import { Product, useStoreContext } from "../../context/StoreContext"
import { heartIconAddFavorites, heartIconRemoveFavorites } from "../../icons/icons"

export default function ProductPage() {
  const { id } = useParams<{ id?: string }>()

  const { products } = useStoreContext()

  const { addToCart, cartItems, removeFromCart } = useCartContext()
  const { addToFav, favorites, removeFavorite } = useFavContext()

  const [imgClic, setImgClic] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  if (!favorites) return <>Loading...</>

  const isProductInFavorites = (productId: number) => favorites.some((favItem) => favItem.productId === productId)
  const isProductInCart = (productId: number) => cartItems.some((cartItem) => cartItem.productId === productId)

  let product: Product | undefined

  if (!products) return <>Loading...</>

  if (id !== undefined) {
    product = products.find((product) => product.id === parseInt(id)) as Product | undefined
  }

  if (!product) {
    return <>Loading...</>
  }

  return (
    <div>
      <div>
        <h3 className={styles.title_h3}>{product.title}</h3>
      </div>
      <div className={styles.container}>
        <div className={styles.container_images}>
          <div className={styles.product_images}>
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

        <div className={styles.container_thumbnail}>
          <div key={product.id} className={styles.product_thumbnail}>
            <img className={styles.thumbnail} src={selectedImage || product.thumbnail} alt={product.title} />
            <button
              className={styles.container_heart_icon}
              onClick={() => {
                if (product) {
                  if (isProductInFavorites(product.id)) {
                    removeFavorite(product.id)
                  } else {
                    addToFav(product.id)
                  }
                }
              }}
            >
              {isProductInFavorites(product.id) ? heartIconAddFavorites : heartIconRemoveFavorites}
            </button>
          </div>
        </div>

        <div className={styles.container_details}>
          <div className={styles.product_details}>
            <div className={styles.product_price}>
              <div> Price: ${product.price}</div>
            </div>

            <div className={styles.product_rating}>Rating of {product.rating}</div>

            <div className={styles.product_description}>{product.description.replaceAll(/[_\-\.]/g, "")}</div>
            <div className={styles.brand}>{product.brand.replaceAll(/[_\-\.]/g, "")}</div>
            <div className={styles.container_btn_add}>
              <button
                className={`${styles.add_btn_cart} ${isProductInCart(product.id) ? styles.add_btn_cart_are_in_cart : ""} `}
                onClick={() => {
                  if (product)
                    if (isProductInCart(product.id)) {
                      removeFromCart(product.id)
                    } else {
                      addToCart(product.id)
                    }
                }}
              >
                {product && isProductInCart(product.id) ? " Add item to cart" : " Add item to cart"}
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
  )
}
