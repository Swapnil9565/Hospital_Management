import React from 'react'

const MyBookingSkeleton = () => {
  return (
    <div className='flex flex-col md:flex-row items-center justify-between p-3 border border-gray-300 rounded-lg shadow-sm mb-2 animate-pulse'>
          <div className='w-full md:w-3/4 space-y-2'>
            <div className='h-4 bg-gray-200 rounded w-1/2'></div>
            <div className='h-4 bg-gray-200 rounded w-2/3'></div>
            <div className='h-4 bg-gray-200 rounded w-2/3'></div>
            <div className='h-4 bg-gray-200 rounded w-1/2'></div>
            <div className='h-4 bg-gray-200 rounded w-1/3'></div>
            <div className='h-4 bg-gray-200 rounded w-1/4'></div>
          </div>
          <div className='h-10 bg-gray-200 rounded w-1/3'></div>
        </div>
  )
}

export default MyBookingSkeleton