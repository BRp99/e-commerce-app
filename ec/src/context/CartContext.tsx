import {
  ReactNode,
  useContext,
  useEffect,
  useState,
  createContext,
} from "react"

import { useLocalStorage } from "../hook/useLocalStorage"

type CartProviderProps = {
  children: ReactNode
}

export type CartItem = {
  id: number
  title: string
  description: string
  price: number
  quantity: number
  thumbnail: string
}

export type Product = {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  category: string
  thumbnail: string
  images: string[]
}

type CartContext = {
  data: Product[]
  cartItems: CartItem[]
  addToCart: (product: Product) => void
  decreaseCartQuantity(id: number): void
  removeFromCart(id: number): void
}

const CartContext = createContext({} as CartContext)

export function useCartContext() {
  return useContext(CartContext)
}

export default function CartProvider({ children }: CartProviderProps) {
  const [data, setData] = useState<Product[]>([])
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "shopping-cart",
    []
  )

  async function fetchData() {
    try {
      const response = await fetch("https://dummyjson.com/products?limit=100")
      const jsonData = await response.json()
      setData(jsonData.products)
    } catch (error) {
      console.log("Error:", error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const addToCart = (product: Product) => {
    const existingCartItem = cartItems.find((item) => item.id === product.id)

    if (existingCartItem) {
      // O produto já está no carrinho, não faz nada
      return
    }

    // Se o produto não existe no carrinho, adicione-o com quantidade 1
    setCartItems((prevCartItems) => [
      ...prevCartItems,
      {
        id: product.id,
        title: product.title,
        description: product.description,
        price: product.price,
        quantity: 1,
        thumbnail: product.thumbnail,
      },
    ])
  }

  function decreaseCartQuantity(id: number) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id)
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 }
          } else {
            return item
          }
        })
      }
    })
  }

  function removeFromCart(id: number) {
    setCartItems((currItems) => {
      return currItems.filter((item) => item.id !== id)
    })
  }

  return (
    <CartContext.Provider
      value={{
        data,
        cartItems,
        addToCart,
        decreaseCartQuantity,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
