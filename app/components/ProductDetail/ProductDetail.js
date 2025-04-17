import Image from 'next/image'
import { useCart } from '@/app/context/CartContext'

export default function ProductDetail({ product }) {
  const { addToCart } = useCart()

  return (
    <div className='flex flex-col md:flex-row gap-8'>
      <div className='md:w-1/2'>
        <Image
          src={product.image}
          alt={product.title}
          width={400}
          height={400}
          className='object-contain'
        />
      </div>
      <div className='md:w-1/2'>
        <h1 className='text-3xl font-bold'>{product.title}</h1>
        <p className='text-2xl text-green-600 my-4'>${product.price}</p>
        <p className='text-gray-600'>{product.description}</p>
        <button
          onClick={() => addToCart(product)}
          className='mt-4 bg-black text-white px-4 py-2 rounded hover:bg-gray-800'
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}
