import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "../layout/Layout"
import CategoryPage from "../CategoryPage/CategoryPage"
import HomePage from "../../pages/HomePage"
import ProductPage from "../ProductPage/ProductPage"
import ShoppingCartPage from "../../pages/ShoppingCartPage"
import FavPage from "../../pages/FavPage"
import StoreProvider from "../../context/StoreContext"
import FavProvider from "../../context/FavContext"
import CartProvider from "../../context/CartContext"

export default function App() {
  return (
    <BrowserRouter>
      <StoreProvider>
        <FavProvider>
          <CartProvider>
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="category/:category" element={<CategoryPage />} />
                <Route path="product/:productId" element={<ProductPage />} />
                <Route path="/shopping-cart" element={<ShoppingCartPage />} />
                <Route path="/favorites" element={<FavPage />} />
              </Routes>
            </Layout>
          </CartProvider>
        </FavProvider>
      </StoreProvider>
    </BrowserRouter>
  )
}
