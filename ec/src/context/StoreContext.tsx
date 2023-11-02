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
  quantity: number
}

type StoreContextType = {
  products: Product[] | undefined
  loadingFetchProducts: boolean
}

const initialState = {
  products: undefined,
} as StoreContextType

const StoreContext = createContext(initialState)

export function useStoreContext() {
  return useContext(StoreContext)
}

export default function StoreProvider({ children }: { children: ReactNode }) {
  const [loadingFetchProducts, setLoadingFetchProducts] = useState(true)
  const [products, setProducts] = useState<Product[]>()

  async function fetchProducts() {
    try {
      setLoadingFetchProducts(true)
      const response = await fetch("https://dummyjson.com/products?limit=100")
      const jsonData = await response.json()
      let products = jsonData.products as Product[]
      products = products.map((p) => ({
        ...p,
        description: p.description.toLowerCase(),
      }))
      setProducts(products)
      setLoadingFetchProducts(false)
    } catch (error) {
      console.error("Error fetching products:", error)
      setLoadingFetchProducts(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return <StoreContext.Provider value={{ products, loadingFetchProducts }}>{children}</StoreContext.Provider>
}
