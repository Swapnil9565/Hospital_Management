import React from 'react'

const UserSkeleton = ({rows,columns}) => {
  return (
    <table className="w-full border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          {Array(columns)
            .fill("")
            .map((_, index) => (
              <th key={index} className="p-3">
                <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse"></div>
              </th>
            ))}
        </tr>
      </thead>
      <tbody>
        {Array(rows)
          .fill("")
          .map((_, rowIndex) => (
            <tr key={rowIndex} className="border-b">
              {Array(columns)
                .fill("")
                .map((_, colIndex) => (
                  <td key={colIndex} className="p-3">
                    <div className="h-4 bg-gray-300 rounded w-full animate-pulse"></div>
                  </td>
                ))}
            </tr>
          ))}
      </tbody>
    </table>
  )
}

export default UserSkeleton