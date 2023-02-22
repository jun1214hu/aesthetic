import React from 'react'
import SearchPhotos from './Components/SearchPhotos'
import { createClient } from 'pexels'
import './styles.scss'

function App () {
  const client = createClient(
    'xtdPiVz1ZIXK8qwGuMk5DtGI0X85QIb8phT5o3KXoBUIgKHcQUfJz6Ax'
  ) // TODO: hide this

  return (
    <div className='App'>
      <div className='container'>
        <div className='heading text-center'>
          <h1 className='display-1 '> Aesthetic </h1>
          <small class='text-muted'> curated images from Pexels</small>
        </div>
        <SearchPhotos client={client} />
      </div>
    </div>
  )
}

export default App
