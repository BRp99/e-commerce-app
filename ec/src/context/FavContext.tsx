import { ReactNode, createContext, useContext, useState } from "react"
import { useLocalStorage } from "../hook/useLocalStorage"

type FavProviderProps = {
  children: ReactNode
}

export type FavItem = {
  id: number
  title: string
  description: string
  price: number
  quantity: number
  brand: string
  thumbnail: string
}

export type ProductFav = {
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
  isFavorite: boolean
}

type FavContext = {
  favorites: FavItem[]
  addToFav: (product: ProductFav) => void
  removeFavorites: (id: number) => void
  totalQuantityFav: number
}
const FavContext = createContext({} as FavContext)

export function useFavContext() {
  return useContext(FavContext)
}

export function FavProvider({ children }: FavProviderProps) {
  const [favorites, setFavorites] = useLocalStorage<FavItem[]>("favorites", [])

  const addToFav = (product: ProductFav) => {
    const existingFavItem = favorites.find((item) => item.id === product.id)
    if (existingFavItem) {
      return
    }
    setFavorites((prevFavItems) => [
      ...prevFavItems,
      {
        id: product.id,
        title: product.title,
        description: product.description,
        price: product.price,
        quantity: 1,
        brand: product.brand,
        thumbnail: product.thumbnail,
        isFavorite: true,
      },
    ])
  }

  // const removeFavorites = (id: number) => {
  //   setFavorites((currItems) => {
  //     return currItems.filter((item) => item.id !== id)
  //   })
  // }

  const removeFavorites = (id: number) => {
    setFavorites((currItems) => {
      return currItems.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            isFavorite: false,
          }
        }
        return item
      })
    })
  }

  const totalQuantityFav = favorites.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  )

  return (
    <FavContext.Provider
      value={{ favorites, addToFav, removeFavorites, totalQuantityFav }}
    >
      {children}
    </FavContext.Provider>
  )
}
