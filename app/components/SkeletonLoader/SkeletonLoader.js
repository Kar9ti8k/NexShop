import React from 'react'

const SkeletonLoader = () => {
  return (
    <div className='h-full flex items-center justify-center'>
      <div
        className='w-20 h-20 rounded-full'
        style={{
          background:
            'conic-gradient(#e80fbd 0%, #2e15d0 33%, #5299d8 66%, #e80fbd 100%)',
          mask: 'radial-gradient(farthest-side, #0000 calc(100% - 8px), #000 0)',
          WebkitMask:
            'radial-gradient(farthest-side, #0000 calc(100% - 8px), #000 0)',
          animation: 'spin 1.5s linear infinite',
        }}
      ></div>
    </div>
  )
}

export default SkeletonLoader
