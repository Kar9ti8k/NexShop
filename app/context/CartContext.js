'use client'
import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()
export const useCart = () => useContext(CartContext)

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])
  const [wishlist, setWishlist] = useState([])
  const [isOffline, setIsOffline] = useState(false)
  const [offlineQueue, setOfflineQueue] = useState([])

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || []
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || []
    setCart(storedCart)
    setWishlist(storedWishlist)
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
    localStorage.setItem('wishlist', JSON.stringify(wishlist))
  }, [cart, wishlist])

  useEffect(() => {
    const handleOffline = () => setIsOffline(true)
    const handleOnline = () => {
      setIsOffline(false)
      offlineQueue.forEach(({ action, product, quantity }) => {
        if (action === 'addToCart') addToCart(product, quantity)
        if (action === 'toggleWishlist') toggleWishlist(product)
      })
      setOfflineQueue([])
    }
    window.addEventListener('offline', handleOffline)
    window.addEventListener('online', handleOnline)
    return () => {
      window.removeEventListener('offline', handleOffline)
      window.removeEventListener('online', handleOnline)
    }
  }, [offlineQueue])

  const addToCart = (product, quantity = 1) => {
    if (isOffline) {
      setOfflineQueue((prev) => [
        ...prev,
        { action: 'addToCart', product, quantity },
      ])
      return
    }
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [...prev, { ...product, quantity }]
    })
  }

  const updateCartQuantity = (id, quantity) => {
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    )
  }

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }

  const toggleWishlist = (product) => {
    if (isOffline) {
      setOfflineQueue((prev) => [
        ...prev,
        { action: 'toggleWishlist', product },
      ])
      return
    }
    setWishlist((prev) =>
      prev.some((item) => item.id === product.id)
        ? prev.filter((item) => item.id !== product.id)
        : [...prev, product]
    )
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        isOffline,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        toggleWishlist,
        setCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
