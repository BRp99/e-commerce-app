import { NavLink, useParams } from "react-router-dom"
import styles from "./CategoryPage.module.css"
import { useCartContext, Product } from "../../context/CartContext"
import { useFavContext } from "../../context/FavContext"
import { useNavigation } from "../../hook/useNavigation"

export default function CategoryPage() {
  const { category } = useParams<string>()

  const { data, addToCart } = useCartContext()
  const { addToFav } = useFavContext()

  const { navigateBack } = useNavigation()

  const categoryProducts: Product[] = data.filter(
    (product) => product.category === category
  )

  const heartIcon = (
    <svg
      height="2rem"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      stroke="orangered"
      fill="orangered"
    >
      <path d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z" />
    </svg>
  )

  return (
    <div>
      CATEGORY PAGE
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
        <h3 className={styles.category_title}>{category}</h3>

        <div className={styles.product_summary}>
          {categoryProducts.map((product) => (
            <div key={product.id} className={styles.product_item}>
              <div className={styles.product_item_content}>
                <NavLink
                  key={product.id}
                  to={`/product/${product.title}`}
                  className={styles.product_item}
                >
                  <img
                    className={styles.thumbnail}
                    src={product.thumbnail}
                    alt={product.title}
                    width={220}
                    height={150}
                  />

                  <div className={styles.product_title}>{product.title}</div>
                  <div className={styles.product_price}>
                    Price: ${product.price}
                  </div>
                </NavLink>
                <button
                  className={styles.heart_icon}
                  onClick={() => addToFav(product)}
                >
                  {heartIcon}
                </button>
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
          ))}
        </div>
      </div>
    </div>
  )
}
