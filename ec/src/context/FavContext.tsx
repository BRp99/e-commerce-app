import { ReactNode, createContext, useContext, useState } from "react"
import { useLocalStorage } from "../hook/useLocalStorage"

// FavItem is a type item that representing an item taht can be added to the favorites list. The item includes this properties:
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

// TS type representing the props expected by the FavProvider
type FavProviderProps = {
  children: ReactNode
}

// TS type representing the shape of the context data. It includes properties for favorites, adding to favorites, removing from favorites and the quantity of items in favorites
type FavContextType = {
  favorites: FavItem[] | undefined
  addToFav: (productId: number) => void
  removeFavorite: (productId: number) => void
  totalQuantityFav: number
}

// This object defines the inicial state for the context. It includes default values for each property in FavContextType type
const initialState = {
  favorites: undefined,
  addToFav: () => {},
  removeFavorite: () => {},
  totalQuantityFav: 0,
} as FavContextType

// create a context called FavContext with the inicial state
const FavContext = createContext(initialState)

// hook that allows other components  access context data and functions
export function useFavContext() {
  return useContext(FavContext)
}

// React component that serves as the provider for the context. It receives a children components as props and manages the state of favorites
export default function FavProvider({ children }: FavProviderProps) {
  const [favorites, setFavorites] = useState<FavItem[]>([])
  // const [favorites, setFavorites] = useLocalStorage<FavItem[]>("favorites", [])

  const addToFav = (productId: number) => {
    const alreadyExists = favorites.find((item) => item.productId === productId)
    if (alreadyExists) {
      return
    }

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
    console.log("Novo favorito adicionado:", newItem)

    setFavorites((items) => {
      const newFavorites = [...items, newItem]
      console.log("Favoritos atualizados:", newFavorites)

      return newFavorites
    })
  }

  function removeFavorite(productId: number) {
    setFavorites((items) => {
      const newItems = items.filter((item) => item.productId !== productId)
      return newItems
    })
  }

  const totalQuantityFav = favorites.reduce((quantity, item) => item.quantity + quantity, 0)

  return <FavContext.Provider value={{ favorites, addToFav, removeFavorite, totalQuantityFav }}>{children}</FavContext.Provider>
}
