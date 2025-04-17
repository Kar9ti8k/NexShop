import ProductDetail from '@/app/components/ProductDetail/ProductDetail'
import QuickLookModal from '@/app/components/QuickLookModal/QuickLookModal'

export default async function ProductDetailPage({ params }) {
  const id = parseInt(params.id, 10)
  if (isNaN(id) || id <= 0) {
    return (
      <div className='container mx-auto p-6'>
        <h1 className='text-2xl font-bold text-red-600'>Invalid Product ID</h1>
      </div>
    )
  }

  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
      cache: 'no-store',
    })

    if (!res.ok) {
      throw new Error(`API error: ${res.status} ${res.statusText}`)
    }

    const product = await res.json()
    if (!product || !product.id) {
      return (
        <div className='container mx-auto p-6'>
          <h1 className='text-2xl font-bold text-red-600'>Product Not Found</h1>
        </div>
      )
    }

    return (
      <div className='container mx-auto p-6'>
        <ProductDetail product={product} />
        <QuickLookModal product={product} />
      </div>
    )
  } catch (error) {
    console.error('Error fetching product:', error)
    return (
      <div className='container mx-auto p-6'>
        <h1 className='text-2xl font-bold text-red-600'>
          Error Loading Product
        </h1>
        <p className='text-gray-600'>{error.message}</p>
      </div>
    )
  }
}
