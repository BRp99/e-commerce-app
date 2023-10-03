import { NavLink, useParams } from "react-router-dom"
import { useCartContext } from "../../context/CartContext"
import { useFavContext } from "../../context/FavContext"
import styles from "./ProductPromotionPage.module.css"
import ColorStarRating from "../../utilities/ColorStarRating"
import ButtonBack from "../../utilities/ButtonBack"
import { useState } from "react"
import { useStoreContext } from "../../context/StoreContext"

export default function ProductPromotionPage() {
  const { productId } = useParams<{ productId: string | undefined }>()

  const { addToCart } = useCartContext()
  const { products } = useStoreContext()
  const { addToFav, removeFavorites, favorites } = useFavContext()

  if (!favorites) return <>Loading...</>

  const isProductInFavorites = (productId: number) => favorites.some((favItem) => favItem.productId === productId)

  if (productId === undefined) {
    return <div>Product not found</div>
  }

  const productIdAsInt = parseInt(productId, 10)

  if (!products) return <>Loading...</>

  const product = products.find((p) => p.id === productIdAsInt)

  if (!product) {
    return <div>Product not found.</div>
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

  const discountedPrice = product.price - (product.price * product.discountPercentage) / 100

  return (
    <div>
      <ButtonBack />

      <div className={styles.container}>
        <div className={styles.thumbnail_container}>
          <img className={styles.img_thumbnail} src={product.thumbnail} alt={product.title} />

          <button
            className={styles.container_heart_icon}
            onClick={() => {
              if (isProductInFavorites(product.id)) {
                removeFavorites(product.id)
              } else {
                addToFav(product.id)
              }
            }}
          >
            {isProductInFavorites(product.id) ? heartIconAdd : heartIconRemove}
          </button>
        </div>
        .
        <div className={styles.info_product_container}>
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
              <button className={styles.add_btn_cart} onClick={() => product && addToCart(product.id)}>
                Add item to cart
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
