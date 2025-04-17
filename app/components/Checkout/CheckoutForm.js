'use client'
import { useState } from 'react'
import { useCart } from '@/app/context/CartContext'
import { useRouter } from 'next/navigation'

export default function CheckoutForm() {
  const { cart, setCart } = useCart()
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    cardNumber: '',
  })
  const [errors, setErrors] = useState({})

  const validate = () => {
    const newErrors = {}
    if (!formData.name) newErrors.name = 'Required'
    if (!formData.email) newErrors.email = 'Required'
    if (!formData.address) newErrors.address = 'Required'
    if (!formData.cardNumber) newErrors.cardNumber = 'Required'
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setCart([])
    router.push('/checkout?success=true')
  }

  return (
    <form onSubmit={handleSubmit} className='max-w-lg mx-auto space-y-4'>
      <div>
        <label className='block text-gray-700'>Name</label>
        <input
          type='text'
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className='border rounded w-full p-2'
        />
        {errors.name && <p className='text-red-500'>{errors.name}</p>}
      </div>
      <div>
        <label className='block text-gray-700'>Email</label>
        <input
          type='email'
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className='border rounded w-full p-2'
        />
        {errors.email && <p className='text-red-500'>{errors.email}</p>}
      </div>
      <div>
        <label className='block text-gray-700'>Address</label>
        <input
          type='text'
          value={formData.address}
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
          className='border rounded w-full p-2'
        />
        {errors.address && <p className='text-red-500'>{errors.address}</p>}
      </div>
      <div>
        <label className='block text-gray-700'>Card Number</label>
        <input
          type='text'
          value={formData.cardNumber}
          onChange={(e) =>
            setFormData({ ...formData, cardNumber: e.target.value })
          }
          className='border rounded w-full p-2'
        />
        {errors.cardNumber && (
          <p className='text-red-500'>{errors.cardNumber}</p>
        )}
      </div>
      <button
        type='submit'
        className='bg-blue-500 text-white px-4 py-2 rounded cursor-pointer'
      >
        Place Order
      </button>
    </form>
  )
}
