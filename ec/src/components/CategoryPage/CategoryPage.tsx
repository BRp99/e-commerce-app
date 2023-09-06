import { NavLink, useParams } from "react-router-dom"
import styles from "./CategoryPage.module.css"
import { useCartContext, Product } from "../../context/CartContext"
import { useNavigation } from "../../hook/useNavigation"

export default function CategoryPage() {
  const { category } = useParams<string>()
  const { data } = useCartContext()
  const { navigateBack } = useNavigation()

  const categoryProducts: Product[] = data.filter(
    (product) => product.category === category
  )

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
        <h3 className={styles.category_title}>{category}</h3>

        <div className={styles.product_summary}>
          {categoryProducts.map((product) => (
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
          ))}
        </div>
      </div>
    </div>
  )
}
