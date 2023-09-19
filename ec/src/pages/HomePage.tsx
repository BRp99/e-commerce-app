import { useCartContext } from "../context/CartContext"
import { Product } from "../context/CartContext"
import CardCategory from "../components/CardCategory/CardCategory"
import styles from "./HomePage.module.css"
import { NavLink } from "react-router-dom"
import CardPromotion from "../components/CardPromotion/CardPromotion"

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

  return (
    <div>
      <h2 className={styles.h2_promotions}>Promotions</h2>

      <div className={styles.container_promotions}>
        {productsWithDiscountBetween17And20Percent
          .slice(0, 4)
          .map((product) => (
            <NavLink
              key={product.id}
              to={`/product-promotion/${product.id}`}
              className={styles.nav_link_promotions}
            >
              <CardPromotion
                id={product.id}
                thumbnail={product.thumbnail}
                title={product.title}
                product={product}
              />
            </NavLink>
          ))}
      </div>

      {/* CATEGORIES */}
      <h2 className={styles.h2_our_categories}>Our Categories</h2>
      <div className={styles.container_categories}>
        {Object.keys(categoryThumbnails).map((category) => (
          <NavLink
            key={category}
            to={`/category/${category}`}
            className={styles.nav_link_categories}
          >
            <CardCategory
              key={category}
              category={category}
              thumbnail={categoryThumbnails[category].thumbnail}
              product={categoryThumbnails[category]}
            />
          </NavLink>
        ))}
      </div>
    </div>
  )
}
