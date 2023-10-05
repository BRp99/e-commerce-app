import { useStoreContext, Product } from "../context/StoreContext"
import CardCategory from "../components/CardCategory/CardCategory"
import styles from "./HomePage.module.css"
import { NavLink } from "react-router-dom"
import CardPromotion from "../components/CardPromotion/CardPromotion"

export type CategoryThumbnails = Record<string, Product>

export default function HomePage() {
  const { products } = useStoreContext()

  const categoryThumbnails: CategoryThumbnails = {}

  if (!products) return <>Loading...</>

  products.forEach((product) => {
    if (!categoryThumbnails[product.category]) {
      categoryThumbnails[product.category] = product
    }
  })

  //CARDPROMOTION
  const productsWithDiscountBetween17And20Percent = products.filter((product) => product.discountPercentage >= 17 && product.discountPercentage <= 20)

  return (
    <div>
      <h2 className={styles.h2_promotions}>Promotions</h2>

      <div className={styles.container_promotions}>
        {productsWithDiscountBetween17And20Percent.slice(0, 5).map((product) => (
          <NavLink key={product.id} to={`/product-promotion/${product.id}`} className={styles.nav_link_promotions}>
            <CardPromotion id={product.id} thumbnail={product.thumbnail} brand={product.brand} product={product as Product} />
          </NavLink>
        ))}
      </div>

      {/* CARDCATEGORY */}
      <h2 className={styles.h2_our_categories}>Our Categories</h2>
      <div className={styles.container_categories}>
        {Object.keys(categoryThumbnails).map((category) => (
          <NavLink key={category} to={`/category/${category}`} className={styles.nav_link_categories}>
            <CardCategory
              key={category}
              category={category}
              thumbnail={categoryThumbnails[category].thumbnail}
              product={categoryThumbnails[category] as Product}
            />
          </NavLink>
        ))}
      </div>
    </div>
  )
}
