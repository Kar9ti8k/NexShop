'use client'
import { useState } from 'react'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth'
import { auth } from '../lib/firebase'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignup, setIsSignup] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password)
      } else {
        await signInWithEmailAndPassword(auth, email, password)
      }
      router.push('/')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className='max-w-md mx-auto m-8'>
      <h1 className='text-3xl font-bold mb-6'>
        {isSignup ? 'Sign Up' : 'Login'}
      </h1>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label className='block text-gray-700'>Email</label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='border rounded w-full p-2'
          />
        </div>
        <div>
          <label className='block text-gray-700'>Password</label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='border rounded w-full p-2'
          />
        </div>
        {error && <p className='text-red-500'>{error}</p>}
        <button
          type='submit'
          className='bg-blue-500 text-white px-4 py-2 rounded cursor-pointer'
        >
          {isSignup ? 'Sign Up' : 'Login'}
        </button>
      </form>
      <button
        onClick={() => setIsSignup(!isSignup)}
        className='mt-4 text-blue-500'
      >
        {isSignup ? (
          <span>
            Already have an account?{' '}
            <span className='font-bold cursor-pointer underline'>Login</span>
          </span>
        ) : (
          <span>
            Need an account?{' '}
            <span className='font-bold cursor-pointer underline'>Sign Up</span>
          </span>
        )}
      </button>
    </div>
  )
}
