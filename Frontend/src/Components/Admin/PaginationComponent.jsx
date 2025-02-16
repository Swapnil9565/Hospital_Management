import React from 'react'
import { Pagination } from "@mui/material";
const PaginationComponent = ({totalItems,currentPage,rowsPerPage,onPageChange}) => {

  const totalPages=Math.ceil(totalItems/rowsPerPage);

  return (
    <div className='flex justify-center mb-5 fixed bottom-5 left-100 transform -translate-x-100 w-[80vw]'>
          <Pagination color='primary' count={totalPages} page={currentPage} variant='outlined' shape='rounded' onChange={onPageChange} />
    </div>
  )
}

export default PaginationComponent