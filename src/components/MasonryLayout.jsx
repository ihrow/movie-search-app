import React from 'react'
import Masonry from "react-masonry-css";
import FilmsListItem from './FilmsListItem'

const breakpointObj = {
  default: 4,
  4000: 8,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  500: 1,
}

const MasonryLayout = ({ films }) => {

  return (
    <Masonry 
        className="flex mb-5 overflow-x-hidden" 
        columnClassName='mx-3' 
        breakpointCols={breakpointObj}
    >
      {films.map((film, idx) => 
        film.Poster === 'N/A' ? null : <FilmsListItem key={film.imdbID} idx={idx} film={film} />
      )}
    </Masonry>
  )
}

export default MasonryLayout
