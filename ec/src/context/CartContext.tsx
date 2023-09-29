import { ReactNode, useContext, useEffect, useState, createContext } from "react"

import { useLocalStorage } from "../hook/useLocalStorage"

type CartProviderProps = {
  children: ReactNode
}

type CartItem = {
  productId: number
  quantity: number
}

type CartContext = {
  cartItems: CartItem[]
  addToCart: (productId: number) => void
  increaseQuantityInCart(productId: number): void
  decreaseQuantityInCart(productId: number): void
  removeFromCart(productId: number): void
  totalQuantityCart: number
}

const CartContext = createContext({} as CartContext)

export function useCartContext() {
  return useContext(CartContext)
}

export default function CartProvider({ children }: CartProviderProps) {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("shopping-cart", [])

  const addToCart = (productId: number) => {
    const alreadyExists = cartItems.find((item) => item.productId === productId)
    if (alreadyExists) return
    setCartItems((cartItems) => [...cartItems, { productId, quantity: 1 }])
  }

  function increaseQuantityInCart(productId: number) {
    setCartItems((cartItems) =>
      cartItems.map((item) => {
        return item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
      })
    )
  }

  function decreaseQuantityInCart(productId: number) {
    setCartItems((cartItems) => {
      const productIndex = cartItems.findIndex((item) => item.productId === productId)
      if (productIndex === -1) return cartItems // item does not exist
      const product = cartItems[productIndex]

      // if quantity is 1, remove the item from the array
      if (product.quantity === 1) {
        const newCartItems = [...cartItems]
        delete newCartItems[productIndex]
        return newCartItems
      }

      // if quantity is >1, decrease the item quantity by 1
      const newCartItems = [...cartItems]
      newCartItems[productIndex].quantity--
      return newCartItems

      // if () {
      //   return cartItems.filter((item) => item.productId !== productId)
      // } else {
      //   return cartItems.map((item) => {
      //     if (item.productId === productId) {
      //       return { ...item, quantity: item.quantity - 1 }
      //     } else {
      //       return item
      //     }
      //   })
      // }
    })
  }

  function removeFromCart(productId: number) {
    setCartItems((currItems) => currItems.filter((item) => item.productId !== productId))
  }

  const totalQuantityCart = cartItems.reduce((quantity, item) => item.quantity + quantity, 0)

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantityInCart,
        decreaseQuantityInCart,
        removeFromCart,
        totalQuantityCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
