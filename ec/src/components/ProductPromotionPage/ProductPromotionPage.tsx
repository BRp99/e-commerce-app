import { NavLink, useParams } from "react-router-dom"
import { useCartContext } from "../../context/CartContext"
import { useNavigation } from "../../hook/useNavigation"
import styles from "./ProductPromotionPage.module.css"
import ColorStarRating from "../../utilities/ColorStarRating"
import { heartIcon } from "../../icons/icons"

export default function ProductPromotionPage() {
  const { productId } = useParams<{ productId: string | undefined }>()
  const { data } = useCartContext()
  const { navigateBack } = useNavigation()

  if (productId === undefined) {
    return <div>Product not found</div>
  }

  const productIdAsInt = parseInt(productId, 10)

  const product = data.find((p) => p.id === productIdAsInt)

  if (!product) {
    return <div>Product not found.</div>
  }

  return (
    <div>
      <div className={styles.back}>
        <button className={styles.btn_back} onClick={navigateBack}>
          <svg
            height="16"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            viewBox="0 0 1024 1024"
          >
            <path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path>
          </svg>
          <span>Back</span>
        </button>
      </div>

      <div className={styles.container}>
        <div className={styles.thumbnail_container}>
          <img
            className={styles.img_thumbnail}
            src={product.thumbnail}
            alt={product.title}
          />
          <button className={styles.heart_icon}>{heartIcon}</button>
        </div>

        <div className={styles.info_product_container}>
          <div className={styles.info_product}>
            <div className={styles.product_discount}>
              {product.discountPercentage}
            </div>
            <div className={styles.title}> {product.title}</div>
            <div className={styles.rating}>
              Rating of {product.rating}
              <ColorStarRating rating={product.rating} />
            </div>
            <div className={styles.description}> {product.description}</div>

            <div className={styles.nav_link_container}>
              <div className={styles.nav_link}>
                See other products like this
                <NavLink
                  to={`/category/${product.category}`}
                  className={styles.nav_link_category}
                >
                  Here!
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
