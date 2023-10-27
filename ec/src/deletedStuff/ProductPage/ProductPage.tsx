import { useParams, NavLink } from "react-router-dom"
import { useCartContext } from "../../context/CartContext"
import { useFavContext } from "../../context/FavContext"
import styles from "./ProductPage.module.css"
import ColorStarRating from "../../utilities/ColorStarRating"
// import ButtonBack from "../../utilities/BackButtonToHomePage"
import { useState } from "react"
import { Product, useStoreContext } from "../../context/StoreContext"

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

  const heartIconAdd = (
    <svg className={styles.heart_icon_add} height="2rem" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="orangered" fill="orangered">
      <path d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z" />
    </svg>
  )

  const heartIconRemove = (
    <svg className={styles.heart_icon_remove} height="2rem" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="orangered" fill="white">
      <path d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z" />
    </svg>
  )

  return (
    <div>
      {/* <ButtonBack /> */}
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
              {isProductInFavorites(product.id) ? heartIconAdd : heartIconRemove}
            </button>
          </div>
        </div>

        <div className={styles.container_details}>
          <div className={styles.product_details}>
            <div className={styles.product_price}>
              <div> Price: ${product.price}</div>
            </div>

            <div className={styles.product_rating}>
              Rating of {product.rating}
              <ColorStarRating />
            </div>

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
