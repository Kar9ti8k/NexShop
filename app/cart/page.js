import React from 'react'
import DragDropZone from '../components/cart/DragDropZone'
import CartSummary from '../components/cart/CartSummary'

const page = () => {
  return (
    <div>
      <div>
        <h1 className='text-3xl font-bold mb-6'>Cart</h1>
        <DragDropZone />
        <CartSummary />{' '}
      </div>
    </div>
  )
}

export default page
