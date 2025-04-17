'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
export default function OrderConfirmation() {
  const router = useRouter()
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      setSuccess(params.get('success') === 'true')
    }
  }, [])

  if (!success) return null

  return (
    <div className='mt-6 text-center'>
      <h2 className='text-2xl font-bold text-green-600'>Order Confirmed!</h2>
      <p className='mt-2'>Thank you for your purchase.</p>
      <button
        onClick={() => router.push('/')}
        className='mt-4 bg-blue-500 text-white px-4 py-2 rounded'
      >
        Continue Shopping
      </button>
    </div>
  )
}
