import { Product } from "../context/StoreContext"

export function getProductsWithMoreThan17Discount(products: Product[]) {
  return products.filter((product) => product.discountPercentage >= 17 && product.discountPercentage <= 20)
}

export function getFirsts5ProductsWith17Discount(products: Product[]) {
  return products.slice(0, 5)
}

export function calculateDiscountedPrice(product: Product): string {
  const discountedPrice = (product.price - (product.price * product.discountPercentage) / 100).toFixed(2)
  return discountedPrice
}
