import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "../layout/Layout"
import HomePage from "../../pages/HomePage/HomePage"
import ProductPage from "../ProductPage/ProductPage"
import CartPage from "../../pages/CartPage/CartPage"
import FavPage from "../../pages/FavPage/FavPage"
import StoreProvider from "../../context/StoreContext"
import FavProvider from "../../context/FavContext"
import CartProvider from "../../context/CartContext"
import CategoriesPage from "../CategoryPage/CategoriesPage"

export default function App() {
  return (
    <BrowserRouter>
      <StoreProvider>
        <FavProvider>
          <CartProvider>
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="categories/:category" element={<CategoriesPage />} />
                <Route path="product/:productId" element={<ProductPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/favorites" element={<FavPage />} />
              </Routes>
            </Layout>
          </CartProvider>
        </FavProvider>
      </StoreProvider>
    </BrowserRouter>
  )
}
