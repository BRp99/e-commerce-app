import { ReactNode, createContext, useContext } from "react"
import { useLocalStorage } from "../hook/useLocalStorage"

type FavProviderProps = {
  children: ReactNode
}

export type FavItem = {
  productId: number
  quantity: number
  title: string
  description: string
  price: number
  discountPercentage?: number
  rating?: number
  stock?: number
  brand: string
  category?: string
  thumbnail?: string
  images?: string[]
}

type FavContextType = {
  favorites: FavItem[] | undefined
  addToFav: (productId: number) => void
  removeFavorites: (productId: number) => void
  totalQuantityFav: number
}

const initialState = {
  favorites: undefined,
  addToFav: () => {},
  removeFavorites: () => {},
  totalQuantityFav: 0,
} as FavContextType

const FavContext = createContext(initialState)

export function useFavContext() {
  return useContext(FavContext)
}

export default function FavProvider({ children }: FavProviderProps) {
  const [favorites, setFavorites] = useLocalStorage<FavItem[]>("favorites", [])

  const addToFav = (productId: number) => {
    const alreadyExists = favorites.find((item) => item.productId === productId)
    if (alreadyExists) return

    const newItem: FavItem = {
      productId,
      quantity: 1,
      title: "",
      description: "",
      price: 0,
      discountPercentage: 0,
      rating: 0,
      stock: 0,
      brand: "",
      category: "",
      thumbnail: "",
      images: [],
    }

    const newFavorites = [...favorites, newItem]
    setFavorites(newFavorites)
  }

  function removeFavorites(productId: number) {
    setFavorites((currItems) => currItems.filter((item) => item.productId !== productId))
  }

  const totalQuantityFav = favorites.reduce((quantity, item) => item.quantity + quantity, 0)

  return <FavContext.Provider value={{ favorites, addToFav, removeFavorites, totalQuantityFav }}>{children}</FavContext.Provider>
}
