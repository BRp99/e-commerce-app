import { BrowserRouter, Route, Routes } from "react-router-dom"
import CartProvider from "../../context/CartContext"
import Layout from "../layout/Layout"
import CategoryPage from "../CategoryPage/CategoryPage"
import HomePage from "../../pages/HomePage"
import ProductPage from "../ProductPage/ProductPage"
import ProductPromotionPage from "../ProductPromotionPage/ProductPromotionPage"

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="category/:category" element={<CategoryPage />} />
            <Route path="product/:title" element={<ProductPage />} />
            <Route
              path="product-promotion/:productId"
              element={<ProductPromotionPage />}
            />
          </Routes>
        </Layout>
      </CartProvider>
    </BrowserRouter>
  )
}
