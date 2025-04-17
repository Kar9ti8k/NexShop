'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/app/context/AuthContext'
import { useTheme } from '@/app/context/ThemeContext'

const NavBar = () => {
  const { user, loader } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const pathname = usePathname()

  const isActive = (path) => pathname === path

  return (
    <div className='bg-emerald-200 dark:bg-gray-900 text-white p-4'>
      <nav className='container mx-auto flex flex-col justify-between max-w-7xl px-8 py-4 sm:flex-row sm:gap-x-16 sm:items-center sm:py-8'>
        <Link
          href='/'
          className='text-3xl font-bold text-black dark:text-white'
        >
          nex
          <span className='text-emerald-600 dark:text-emerald-400'>Shop</span>
        </Link>
        <div className='flex gap-x-6 items-center'>
          <Link
            href='/products'
            className={`capitalize text-lg tracking-wide duration-300 relative group ${
              isActive('/products')
                ? 'text-emerald-600 dark:text-emerald-400'
                : 'text-black hover:text-emerald-600 dark:text-white dark:hover:text-emerald-400'
            }`}
          >
            Products
            <span
              className={`absolute left-0 -bottom-1 h-0.5 bg-emerald-600 dark:bg-emerald-400 transition-all duration-300 ${
                isActive('/products') ? 'w-full' : 'w-0 group-hover:w-full'
              }`}
            ></span>
          </Link>
          <Link
            href='/cart'
            className={`capitalize text-lg tracking-wide duration-300 relative group ${
              isActive('/cart')
                ? 'text-emerald-600 dark:text-emerald-400'
                : 'text-black hover:text-emerald-600 dark:text-white dark:hover:text-emerald-400'
            }`}
          >
            Cart
            <span
              className={`absolute left-0 -bottom-1 h-0.5 bg-emerald-600 dark:bg-emerald-400 transition-all duration-300 ${
                isActive('/cart') ? 'w-full' : 'w-0 group-hover:w-full'
              }`}
            ></span>
          </Link>
          <Link
            href='/wishlist'
            className={`capitalize text-lg tracking-wide duration-300 relative group ${
              isActive('/wishlist')
                ? 'text-emerald-600 dark:text-emerald-400'
                : 'text-black hover:text-emerald-600 dark:text-white dark:hover:text-emerald-400'
            }`}
          >
            Wishlist
            <span
              className={`absolute left-0 -bottom-1 h-0.5 bg-emerald-600 dark:bg-emerald-400 transition-all duration-300 ${
                isActive('/wishlist') ? 'w-full' : 'w-0 group-hover:w-full'
              }`}
            ></span>
          </Link>
          {loader ? (
            <span className='capitalize text-lg tracking-wide text-black dark:text-white'>
              loading...
            </span>
          ) : user ? (
            <Link
              href='/profile'
              className={`capitalize text-lg tracking-wide duration-300 relative group ${
                isActive('/profile')
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-black hover:text-emerald-600 dark:text-white dark:hover:text-emerald-400'
              }`}
            >
              Profile
              <span
                className={`absolute left-0 -bottom-1 h-0.5 bg-emerald-600 dark:bg-emerald-400 transition-all duration-300 ${
                  isActive('/profile') ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              ></span>
            </Link>
          ) : (
            <Link
              href='/login'
              className={`capitalize text-lg tracking-wide duration-300 relative group ${
                isActive('/login')
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-black hover:text-emerald-600 dark:text-white dark:hover:text-emerald-400'
              }`}
            >
              Login
              <span
                className={`absolute left-0 -bottom-1 h-0.5 bg-emerald-600 dark:bg-emerald-400 transition-all duration-300 ${
                  isActive('/login') ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              ></span>
            </Link>
          )}
        </div>
      </nav>
    </div>
  )
}

export default NavBar
