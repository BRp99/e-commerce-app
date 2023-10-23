import { useStoreContext, Product } from "../context/StoreContext"
import CardCategory from "../components/CardCategory/CardCategory"
import styles from "./HomePage.module.css"
import { NavLink } from "react-router-dom"
import CardPromotion from "../components/CardPromotion/CardPromotion"
import { useEffect, useState } from "react"
import { getFirsts5ProductsWith17Discount, getProductsWithMoreThan17Discount } from "../utilities/shareFunctions"
import { loadingIcon } from "../icons/icons"

export type CategoryThumbnails = Record<string, Product>

export default function HomePage() {
  const [loading, setLoading] = useState(true)

  const { products } = useStoreContext()

  const categoryThumbnails: CategoryThumbnails = {}

  useEffect(() => {
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className={styles.loading_container}>
        <div className={styles.loading_svg}>
          {loadingIcon}

          <div className={styles.loading_string}>Loading...</div>
        </div>
      </div>
    )
  }

  if (!products) {
    return (
      <div className={styles.loading_container}>
        <div className={styles.error_loading}> Error loading products. Try again later </div>
      </div>
    )
  }

  products.forEach((product) => {
    if (!categoryThumbnails[product.category]) {
      categoryThumbnails[product.category] = product
    }
  })

  const productsWithMoreThan17Discount: Product[] = getProductsWithMoreThan17Discount(products)

  const fiveProducts: Product[] = getFirsts5ProductsWith17Discount(productsWithMoreThan17Discount)

  return (
    <div className={styles.container}>
      {/* <h2 className={styles.h2_promotions}>Promotions</h2> */}

      <div className={styles.container_promotions}>
        {fiveProducts.map((product) => (
          <NavLink key={product.id} to={`/product/${product.id}`} className={styles.nav_link_promotions}>
            <CardPromotion id={product.id} thumbnail={product.thumbnail} brand={product.brand} product={product as Product} />
          </NavLink>
        ))}
      </div>

      {/* CARDCATEGORY */}
      {/* <h2 className={styles.h2_our_categories}>Our Categories</h2> */}
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
