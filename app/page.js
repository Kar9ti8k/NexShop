'use client'
import { useEffect, useState } from 'react'
import axiosBar from './lib/axios'
import ProductCard from './components/ProductCard/ProductCard'
import page from './components/SkeletonLoader/page'
import axios from 'axios'
import SkeletonLoader from './components/SkeletonLoader/SkeletonLoader'
export default function Home() {
  const [products, setProducts] = useState([])
  const [loader, setLoader] = useState(true)
  useEffect(() => {
    axios
      .get('https://fakestoreapi.com/products')
      .then((res) => {
        setProducts(res.data)
        setLoader(false)
      })
      .catch((err) => {
        console.error(err)
        setLoader(false)
      })
  }, [])

  return (
    <main className='p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
      {loader ? (
        // ? Array(8)
        //     .fill()
        //     .map((_, i) => <SkeletonLoader key={i} />)
        <div className='m-[2rem]'>
          <SkeletonLoader />
        </div>
      ) : (
        products.map((p) => <ProductCard key={p.id} product={p} />)
      )}
    </main>
  )
}
