'use client'
import { motion } from 'framer-motion'
import { useCart } from '@/app/context/CartContext'
import toast from 'react-hot-toast'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const ProductCard = ({ product }) => {
  const { addToCart, toggleWishlist, wishlist } = useCart()
  const router = useRouter()
  const isWishlisted = wishlist.some((item) => item.id === product.id)

  const handleDragStart = (e) => {
    e.dataTransfer.setData('product', JSON.stringify(product))
  }

  const handleAddToCart = () => {
    console.log('Adding to cart:', product) // Debug log
    addToCart(product)
    toast.success(`${product.title} added to cart!`, {
      position: 'top-center',
      duration: 2000,
    })
    // Optional: Navigate to cart page
    // router.push('/cart');
  }

  return (
    <motion.div
      className='border rounded-lg p-4 shadow-lg dark:bg-gray-800 dark:border-gray-700'
      whileHover={{ scale: 1.05 }}
      drag='x'
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={(e, info) => {
        if (info.offset.x > 50) {
          addToCart(product)
          toast.success(`${product.title} added via drag!`)
        }
      }}
      draggable
      onDragStart={handleDragStart}
    >
      <Image
        src={product.image}
        alt={product.title}
        width={200}
        height={200}
        className='object-contain mx-auto h-40'
      />
      <h2 className='text-sm font-semibold mt-2 line-clamp-2 dark:text-white'>
        {product.title}
      </h2>
      <p className='text-gray-600 text-sm dark:text-gray-300'>
        ${product.price}
      </p>
      <div className='flex gap-4'>
        <button
          className='mt-2 text-white px-2 py-2 rounded cursor-pointer bg-gradient-to-r from-blue-700 via-blue-500 to-blue-400 hover:opacity-90 transition duration-300 dark:from-blue-600 dark:via-blue-400 dark:to-blue-300'
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
        <button
          onClick={() => toggleWishlist(product)}
          className={`mt-2 px-4 py-2 rounded cursor-pointer hover:opacity-90 transition duration-300 ${
            isWishlisted
              ? 'bg-red-500 text-white dark:bg-red-600'
              : 'bg-gray-300 dark:bg-gray-600 dark:text-white'
          }`}
        >
          {isWishlisted ? 'Remove' : 'Wishlist'}
        </button>
      </div>
    </motion.div>
  )
}

export default ProductCard
