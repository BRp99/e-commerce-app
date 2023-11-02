import { Product } from "../context/StoreContext"

export function getPromoProducts(products: Product[], count = 5) {
  return products.filter((product) => product.discountPercentage >= 17 && product.discountPercentage <= 20).slice(0, count)
}

export function getProductsWithMoreThan17Discount(products: Product[]) {
  return products.filter((product) => product.discountPercentage >= 17 && product.discountPercentage <= 20)
}

export function getFirsts3ProductsWith17Discount(products: Product[]) {
  return products.slice(0, 3)
}

export function calculateDiscountedPrice(product: Product): number {
  const discountedPrice = (product.price - (product.price * product.discountPercentage) / 100).toFixed(2)
  return parseFloat(discountedPrice)
}
