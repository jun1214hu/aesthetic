import React from 'react'
import '../styles.scss'

const Pagination = props => {
  const { currentPage, maxPage, minPage, totalPages } = props

  // create list of page numbers
  const pages = []
  for (let i = 0; i <= totalPages; i++) {
    pages.push(i)
  }

  const handlePreviousClick = () => {
    props.onPreviousPageClick()
  }

  const handleNextClick = () => {
    props.onNextPageClick()
  }

  // users may click a random page to view
  const handlePageClick = e => {
    props.onPageChange(Number(e.target.id))
  }

  // list of page numbers currently available to click
  const pageNumbers = pages.map(page => {
    if (page <= maxPage && page > minPage) {
      return (
        <li
          class='page-item'
          key={page}
          id={page}
          onClick={handlePageClick}
          className={
            currentPage === page
              ? 'active btn btn-outline-dark'
              : 'btn btn-outline-dark'
          }
        >
          {' '}
          {page}{' '}
        </li>
      )
    } else {
      return null // don't return page numbers if there are not enough photos
    }
  })

  // show Next Page and Previous Page button
  let moreNextPages = null
  let morePrevPages = null
  if (pages.length > maxPage) {
    moreNextPages = (
      <li class='page-item btn btn-outline-dark' onClick={handleNextClick}>
        {' '}
        &hellip;{' '}
      </li>
    )
  }
  if (minPage >= 1) {
    morePrevPages = (
      <li class='page-item btn btn-outline-dark' onClick={handlePreviousClick}>
        {' '}
        &hellip;{' '}
      </li>
    )
  }

  return (
    <div className='paginationcontainer'>
      <ul className='pagination justify-content-center'>
        <li className='page-item'>
          <button
            type='button'
            className='btn btn-outline-dark'
            onClick={handlePreviousClick}
            disabled={currentPage === pages[0]}
          >
            Prev
          </button>
        </li>
        {morePrevPages}
        {pageNumbers}
        {moreNextPages}
        <li className='page-item'>
          <button
            type='button'
            className='btn btn-outline-dark'
            onClick={handleNextClick}
            disabled={currentPage === pages[pages.length - 1]}
          >
            Next
          </button>
        </li>
      </ul>
    </div>
  )
}

export default Pagination
