import { useStoreContext, Product } from "../context/StoreContext"
import CardCategory from "../components/CardCategory/CardCategory"
import styles from "./HomePage.module.css"
import { NavLink } from "react-router-dom"
import CardPromotion from "../components/CardPromotion/CardPromotion"
import { getFirsts5ProductsWith17Discount, getProductsWithMoreThan17Discount } from "../utilities/shareFunctions"

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

  const productsWithMoreThan17Discount: Product[] = getProductsWithMoreThan17Discount(products)

  const fiveProducts: Product[] = getFirsts5ProductsWith17Discount(productsWithMoreThan17Discount)

  return (
    <div>
      <h2 className={styles.h2_promotions}>Promotions</h2>

      <div className={styles.container_promotions}>
        {fiveProducts.map((product) => (
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
