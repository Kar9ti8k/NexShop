'use client'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { auth } from '../lib/firebase'
import { signOut } from 'firebase/auth'
import { useRouter } from 'next/navigation'

export default function ProfilePage() {
  const { user, loader } = useAuth()
  const { cart, wishlist } = useCart()
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut(auth)
    router.push('/')
  }

  if (loader) return <p>Loading...</p>
  if (!user) {
    router.push('/login')
    return null
  }

  return (
    <div>
      <h1 className='text-3xl font-bold mb-6'>Profile</h1>
      <p className='mb-4'>Email: {user.email}</p>
      <div className='mb-6'>
        <h2 className='text-2xl font-semibold'>Order History</h2>
        <p className='text-gray-600'>No recent orders (simulated).</p>
      </div>
      <div className='mb-6'>
        <p>Cart Items: {cart.length}</p>
        <p>Wishlist Items: {wishlist.length}</p>
      </div>
      <button
        onClick={handleSignOut}
        className='bg-red-500 text-white px-4 py-2 rounded'
      >
        Sign Out
      </button>
    </div>
  )
}
