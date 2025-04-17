'use client'
import { useCart } from '../context/CartContext'
import ProductCard from '../components/ProductCard/ProductCard'

export default function WishlistPage() {
  const { wishlist } = useCart()

  return (
    <div>
      <h1 className='text-3xl font-bold mb-6'>Wishlist</h1>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
