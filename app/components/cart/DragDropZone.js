'use client'
import { useCart } from '@/app/context/CartContext'

export default function DragDropZone() {
  const { addToCart } = useCart()

  return (
    <div
      className='border-dashed border-2 p-6 text-center rounded-lg mb-6'
      onDrop={(e) => {
        e.preventDefault()
        const product = JSON.parse(e.dataTransfer.getData('product'))
        addToCart(product)
      }}
      onDragOver={(e) => e.preventDefault()}
    >
      <p className='text-gray-600'>Drag products here to add to cart</p>
    </div>
  )
}
