import { NavLink, useParams } from "react-router-dom"
import styles from "./CategoryPage.module.css"
import { useCartContext, Product } from "../../context/CartContext"
import { useFavContext } from "../../context/FavContext"
import ButtonBack from "../../utilities/ButtonBack"

export default function CategoryPage() {
  const { category } = useParams<string>()

  const { data, addToCart } = useCartContext()
  const { addToFav } = useFavContext()

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
      <ButtonBack />
      <div className={styles.container}>
        <h3 className={styles.category_title}>
          {category?.replaceAll(/[_\-\.]/g, "")}
        </h3>

        <div className={styles.product_summary}>
          {categoryProducts.map((product) => (
            <div key={product.id} className={styles.product_item}>
              <div className={styles.product_item_content}>
                <NavLink
                  key={product.id}
                  to={`/product/${product.id}`}
                  className={styles.product_item}
                >
                  <img
                    className={styles.thumbnail}
                    src={product.thumbnail}
                    alt={product.title}
                  />
                </NavLink>
                <div className={styles.product_title}>{product.title}</div>
                <div className={styles.container_price_container}>
                  <div className={styles.price_container}>
                    <div className={styles.price}>${product.price}</div>
                  </div>
                </div>

                <button
                  className={styles.heart_icon}
                  onClick={() => addToFav(product)}
                >
                  {heartIcon}
                </button>

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
          ))}
        </div>
      </div>
    </div>
  )
}
