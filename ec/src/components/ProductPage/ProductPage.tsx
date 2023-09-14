import { useParams } from "react-router-dom"
import { useCartContext } from "../../context/CartContext"
import styles from "./ProductPage.module.css"
import { useNavigation } from "../../hook/useNavigation"
import ColorStarRating from "../../utilities/ColorStarRating"
import { heartIcon } from "../../icons/icons"
import { useState } from "react"

export default function ProductPage() {
  const { title } = useParams<{ title: string }>()
  const { data, addToCart } = useCartContext()
  const { navigateBack } = useNavigation()

  const [imgClic, setImgClic] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [addedToCart, setAddedToCart] = useState(false) // Variável para controlar se o item foi adicionado

  const product = data.find((product) => product.title === title)

  if (!product) {
    return <div>Product not found</div>
  }

  return (
    <div>
      PRODUCT PAGE
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
      <div>
        <h3 className={styles.title_h3}>{product.title}</h3>
      </div>
      <div className={styles.container}>
        <div className={styles.container_images}>
          <div className={styles.product_images}>
            {product.images.map((image, index) => (
              <img
                key={`image-${index}`}
                className={`${styles.images} ${
                  selectedImage === image ? styles.selected : ""
                }`}
                src={image}
                alt={`Product Image ${index}`}
                width={220}
                height={150}
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
            <img
              className={styles.thumbnail}
              src={selectedImage || product.thumbnail}
              alt={product.title}
              width={500}
            />
            <button className={styles.heart_icon}>{heartIcon}</button>
          </div>
        </div>

        <div className={styles.container_details}>
          <div className={styles.product_details}>
            <div className={styles.product_price}>
              <div> Price: ${product.price}</div>
            </div>

            <div className={styles.product_rating}>
              Rating of {product.rating}
              <ColorStarRating rating={product.rating} />
            </div>

            <div className={styles.product_description}>
              {product.description}
            </div>
            <div className={styles.container_btn_add}>
              <button
                className={styles.add_btn_cart}
                onClick={() => {
                  if (product) {
                    addToCart(product)
                  }
                }}
              >
                Add item to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
