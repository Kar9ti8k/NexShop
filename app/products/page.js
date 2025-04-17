'use client'
import { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard/ProductCard'
import SkeletonLoader from '../components/SkeletonLoader/SkeletonLoader'

const categories = [
  { value: '', label: 'All Categories' },
  { value: 'electronics', label: 'Electronics' },
  { value: 'jewelery', label: 'Jewelery' },
  { value: "men's clothing", label: "Men's Clothing" },
  { value: "women's clothing", label: "Women's Clothing" },
]

const sortOptions = [
  { value: '', label: 'Sort By' },
  { value: 'asc', label: 'Price: Low to High' },
  { value: 'desc', label: 'Price: High to Low' },
]

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [category, setCategory] = useState('')
  const [sort, setSort] = useState('')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        setError(null)

        let url = 'https://fakestoreapi.com/products'
        if (category)
          url = `https://fakestoreapi.com/products/category/${category}`

        const response = await fetch(url)
        if (!response.ok) throw new Error('Failed to fetch products')

        let data = await response.json()

        // Apply sorting
        if (sort === 'asc') data.sort((a, b) => a.price - b.price)
        if (sort === 'desc') data.sort((a, b) => b.price - a.price)

        setProducts(data)
      } catch (err) {
        console.error('Fetch error:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    const debounceTimer = setTimeout(fetchProducts, 300)
    return () => clearTimeout(debounceTimer)
  }, [category, sort])

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-6'>Products</h1>

      {/* Filters */}
      <div className='mb-6 flex flex-wrap gap-4'>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className='border p-2 rounded bg-white'
          disabled={loading}
        >
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className='border p-2 rounded bg-white'
          disabled={loading}
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Error Message */}
      {error && (
        <div className='mb-6 p-4 bg-red-100 text-red-700 rounded'>
          Error: {error}. Please try again later.
        </div>
      )}

      {/* Products Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {loading ? (
          Array(8)
            .fill()
            .map((_, i) => <SkeletonLoader key={i} />)
        ) : products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className='col-span-full text-center py-10'>
            No products found in this category
          </div>
        )}
      </div>
    </div>
  )
}
