import React from 'react'

const CheckMsgSkeleton = ({rows=10,columns=5}) => {
  return (
    <div className="animate-pulse">
      <table className="w-full border-collapse mt-10 border-separate border-spacing-y-3">
        <thead>
          <tr className="px-8 text-center">
            {Array.from({ length: columns }).map((_, colIndex) => (
              <th key={colIndex}>
                <div className="w-24 h-4 bg-gray-200 rounded mb-2"></div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <tr key={rowIndex} className="text-center odd:bg-blue-200">
              {Array.from({ length: columns }).map((_, colIndex) => (
                <td key={colIndex}>
                  <div className="w-24 h-4 bg-gray-200 rounded mb-2"></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CheckMsgSkeleton