import React from 'react'

const CheckDoctorsSkeleton = () => {
  return (
    <div className="animate-pulse">
            <table className="w-full border-collapse mt-10 border-separate border-spacing-y-3">
              <thead>
                <tr className="px-8 text-center">
                  <th><div className="h-4 bg-gray-200 rounded w-1/4"></div></th>
                  <th><div className="h-4 bg-gray-200 rounded w-1/4"></div></th>
                  <th><div className="h-4 bg-gray-200 rounded w-1/4"></div></th>
                  <th><div className="h-4 bg-gray-200 rounded w-1/4"></div></th>
                  <th><div className="h-4 bg-gray-200 rounded w-1/4"></div></th>
                  <th><div className="h-4 bg-gray-200 rounded w-1/4"></div></th>
                  <th><div className="h-4 bg-gray-200 rounded w-1/4"></div></th>
                  <th><div className='h-6 w-6 bg-gray-200 rounded'></div></th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-center px-8 odd:bg-blue-200">
                  <td><div className="h-4 bg-gray-200 rounded w-1/4"></div></td>
                  <td><div className="h-20 w-20 bg-gray-200 rounded mx-auto"></div></td>
                  <td><div className="h-4 bg-gray-200 rounded w-1/4"></div></td>
                  <td><div className="h-4 bg-gray-200 rounded w-1/4"></div></td>
                  <td><div className="h-4 bg-gray-200 rounded w-1/4"></div></td>
                  <td><div className="h-4 bg-gray-200 rounded w-1/4"></div></td>
                  <td><div className="h-4 bg-gray-200 rounded w-1/4"></div></td>
                  <td><div className='h-6 w-6 bg-gray-200 rounded mx-auto'></div></td>
                </tr>
              </tbody>
            </table>
          </div>
  )
}

export default CheckDoctorsSkeleton