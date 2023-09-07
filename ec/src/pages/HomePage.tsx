import { useCartContext } from "../context/CartContext"
import { Product } from "../context/CartContext"
import Categories from "../components/Categories/Categories"
import styles from "./HomePage.module.css"
import { NavLink } from "react-router-dom"

export type CategoryThumbnails = Record<string, Product>

export default function HomePage() {
  const { data } = useCartContext()

  const categoryThumbnails: CategoryThumbnails = {}

  data.forEach((product) => {
    if (!categoryThumbnails[product.category]) {
      categoryThumbnails[product.category] = product
    }
  })

  //PROMOTIONS
  const productsWithDiscountBetween17And20Percent = data.filter(
    (product) =>
      product.discountPercentage >= 17 && product.discountPercentage <= 20
  )

  const uniqueCategories = Array.from(
    new Set(
      productsWithDiscountBetween17And20Percent.map(
        (product) => product.category
      )
    )
  )

  return (
    <div>
      <h2 className={styles.our_categories}>Our Categories</h2>
      <div className={styles.container}>
        <div className={styles.container_promotions}>
          <div>
            <h3>Promoções</h3>
            {productsWithDiscountBetween17And20Percent.map((product) => (
              <div key={product.id}>
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  width={100}
                  height={100}
                />
              </div>
            ))}
          </div>
        </div>

        <div className={styles.container_categories}>
          {Object.keys(categoryThumbnails).map((category) => (
            <NavLink
              key={category}
              to={`/category/${category}`}
              className={styles.category_name}
            >
              <Categories
                key={category}
                category={category}
                thumbnail={categoryThumbnails[category].thumbnail}
              />
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  )
}
