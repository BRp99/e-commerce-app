import {
  ReactNode,
  useContext,
  useEffect,
  useState,
  createContext,
} from "react"

type CartProviderProps = {
  children: ReactNode
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
}

const CartContext = createContext({} as CartContext)

export function useCartContext() {
  return useContext(CartContext)
}

export default function CartProvider({ children }: CartProviderProps) {
  const [data, setData] = useState<Product[]>([])

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

  return (
    <CartContext.Provider
      value={{
        data,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
