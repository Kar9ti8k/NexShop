'use client'
import { useState } from 'react'
import Image from 'next/image'

export default function QuickLookModal({ product }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className='mt-4 bg-gray-200 px-4 py-2 rounded'
      >
        Quick Look
      </button>
      {isOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
          <div className='bg-white p-6 rounded-lg max-w-lg w-full'>
            <Image
              src={product.image}
              alt={product.title}
              width={300}
              height={300}
              className='object-contain'
            />
            <h3 className='text-xl font-semibold mt-4'>{product.title}</h3>
            <p className='text-gray-600'>${product.price}</p>
            <button
              onClick={() => setIsOpen(false)}
              className='mt-4 bg-red-500 text-white px-4 py-2 rounded'
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  )
}
