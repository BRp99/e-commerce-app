import { ReactNode, useContext, useEffect, useState, createContext } from "react"

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

type StoreContextType = {
  products: Product[] | undefined
}

const initialState = {
  products: undefined,
} as StoreContextType

// Is create StoreContext and is initialized with the inicialState
const StoreContext = createContext(initialState)

// custom hook that allows components to acess the context state using useContext hook.
// It returns the value of StoreContext. with includes the products array
export function useStoreContext() {
  return useContext(StoreContext)
}

// StoreProvider is a functional component that wraps its children in StoreContext.Provider. This component is likely intended to be placed hight up in the component hierarchy to provide acces to the product data throughout the app.
export default function StoreProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>()

  async function fetchProducts() {
    try {
      const response = await fetch("https://dummyjson.com/products?limit=100")
      const jsonData = await response.json()
      let products = jsonData.products as Product[]
      products = products.map((p) => ({
        ...p,
        description: p.description.toLowerCase(),
      }))
      setProducts(products)
    } catch (error) {
      console.error("Error fetching products:", error)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  // Its renders the StoreContext.Provider passing the products state as the context value and rendering its children as props. In other words: It's responsible for wrapping its children and making the context value available to them
  return <StoreContext.Provider value={{ products }}>{children}</StoreContext.Provider>
}
