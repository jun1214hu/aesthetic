import React, { useState, useEffect } from 'react'
import Pagination from './Pagination'
import '../styles.scss'

const SearchPhotos = props => {
  const client = props.client
  const pageNumberLimit = 5

  const [query, setQuery] = useState('')
  const [result, setResult] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [maxPage, setMaxPage] = useState(5)
  const [minPage, setMinPage] = useState(0)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    setLoading(true)
    if (!result) {
      client.photos
        .search({ query, per_page: 10, page: currentPage }) // using Pexel API for Query
        .then(response => {
          setResult(response.photos)
          setLoading(false)
          setTotalPages(response.total_results / 10)
        })
    } else {
      fetch(`https://api.pexels.com/v1/curated?page=${currentPage}&per_page=10`) // using Pexel API for Curated
        .then(response => response.json())
        .then(json => {
          setResult(json.photos)
          setLoading(false)
          setTotalPages(json.total_results / 10)
        })
    }
  }, [currentPage, query])

  // set current page number for Page Number button and API call
  const onPageChange = pageNumber => {
    setCurrentPage(pageNumber)
  }

  const onPreviousPageClick = () => {
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPage(maxPage - pageNumberLimit)
      setMinPage(minPage - pageNumberLimit)
    }
    setCurrentPage(prev => prev - 1)
  }

  const onNextPageClick = () => {
    if (currentPage + 1 > maxPage) {
      setMaxPage(maxPage + pageNumberLimit)
      setMinPage(minPage + pageNumberLimit)
    }
    setCurrentPage(prev => prev + 1)
  }

  const paginationAttr = {
    currentPage,
    maxPage,
    minPage,
    totalPages
  }

  const handleSubmit = async e => {
    setLoading(true)
    e.preventDefault() // prevent reloading
    setCurrentPage(1) // when we search, always go back to first page
    client.photos
      .search({ query, per_page: 10, page: currentPage })
      .then(response => {
        setResult(response.photos)
        setLoading(false)
        setTotalPages(response.total_results / 10)
      })
  }

  return (
    <div>
      <div className='input-group rounded searchBox'>
        <input
          className='form-control rounded'
          type='search'
          name='imageSearch'
          placeholder='search'
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button
          className='btn btn-outline-dark'
          onClick={handleSubmit}
          type='submit'
        >
          search
        </button>
      </div>
      {loading ? (
        <div className='d-flex justify-content-center'>
          <div className='spinner-border text-secondary' role='status'>
            <span className='sr-only'> </span>
          </div>
        </div>
      ) : (
        <div>
          {
            <Pagination
              {...paginationAttr}
              onPreviousPageClick={onPreviousPageClick}
              onNextPageClick={onNextPageClick}
              onPageChange={onPageChange}
            />
          }
          <div className='result container'>
            <div className='row  card-list d-flex justify-content-center'>
              {result.map(image => (
                <div className='col image-wrapper justify-content-center'>
                  <div
                    className='card border-0 d-block text-center'
                    key={image.id}
                  >
                    <a href={image.url} target='_blank'>
                      {' '}
                      <img src={image.src.medium} alt={image.alt} />
                    </a>
                    <div className='title'>
                      <p className='card-title'>
                        Photo by {image.photographer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchPhotos
