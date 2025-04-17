'use client'
import { useCart } from '@/app/context/CartContext'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function CartSummary() {
  const { cart, updateCartQuantity, removeFromCart } = useCart()
  const router = useRouter()
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className='mt-6'>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className='flex border-b py-4'>
              <Image
                src={item.image}
                alt={item.title}
                width={80}
                height={80}
                className='object-contain'
              />
              <div className='ml-4 flex-grow'>
                <h3 className='text-lg'>{item.title}</h3>
                <p className='text-gray-600'>${item.price}</p>
                <input
                  type='number'
                  min='1'
                  value={item.quantity}
                  onChange={(e) =>
                    updateCartQuantity(item.id, parseInt(e.target.value))
                  }
                  className='w-16 border p-1 mt-2'
                />
                <button
                  onClick={() => removeFromCart(item.id)}
                  className='text-red-500 ml-4 cursor-pointer'
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <p className='text-xl font-semibold mt-4'>
            Total: ${total.toFixed(2)}
          </p>
          <button
            onClick={() => router.push('/checkout')}
            className='mt-4 bg-green-500 text-white px-4 py-2 rounded'
          >
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  )
}
