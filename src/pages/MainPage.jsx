import { motion } from 'framer-motion'
import React, { useState, useEffect } from 'react'
import FilmsList from '../components/FilmsList'
import Search from '../components/Search'
import { useActions } from '../hooks/useActions'
import { textVariant } from '../utils/motion'
import { useSelector } from 'react-redux'

const Main = () => {
  const [searchQuery, setSearchQuery] = useState(
    window.localStorage.getItem('searchQuery') === null
      ? 'John Wick'
      : window.localStorage.getItem('searchQuery')
  )
  const [page, setPage] = useState(1)
  const { fetchFilms, resetFilms } = useActions()
  const { totalResults } = useSelector(state => state.films)

  useEffect(() => {
    if (page > Math.ceil(totalResults / 10)) {
      return
    }
    fetchFilms(page, searchQuery)
  }, [page])

  useEffect(() => {
    resetFilms()
    setPage(1)
    window.localStorage.setItem('searchQuery', searchQuery)
  }, [searchQuery])

  return (
    <div className="w-full h-full flex flex-col justify-center items-center text-center">
      <motion.h1
        className="text-black text-7xl font-bold"
        variants={textVariant(0.5)}
        initial="hidden"
        whileInView="show"
      >
        Find your{' '}
        <motion.span className="text-bg-gradient">favourite</motion.span> movie.
      </motion.h1>
      <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery}  />
      <FilmsList setPage={setPage} />
    </div>
  )
}

export default Main
