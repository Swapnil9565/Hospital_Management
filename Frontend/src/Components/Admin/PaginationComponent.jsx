import React from 'react'
import { Pagination } from "@mui/material";
const PaginationComponent = ({totalItems,currentPage,rowsPerPage,onPageChange}) => {

  const totalPages=Math.ceil(totalItems/rowsPerPage);

  return (
    <div className='flex justify-center my-5 fixed left-100 bottom-5 transform -translate-x-100 w-[128vw] md:w-[120vw]'>
          <Pagination color='primary' count={totalPages} page={currentPage} variant='outlined' shape='rounded' onChange={onPageChange} />
    </div>
  )
}

export default PaginationComponent