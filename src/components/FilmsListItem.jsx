import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useActions } from '../hooks/useActions'
import { fadeIn } from '../utils/motion'
import { useNavigate } from 'react-router-dom'


const FilmsListItem = ({ idx, film }) => {
  const navigate = useNavigate()
  const { fetchFilmPlot } = useActions()

  /**
   * As basic search request doesn't return plot, 
   * we need to fetch it separately for each film.
   */
  useEffect(() => {
    fetchFilmPlot(film.imdbID)
  }, [])

  return (
    <motion.div 
      className="w-full rounded-lg shadow-lg bg-gray-800 border-gray-700 my-5 md:my-8"
      variants={fadeIn(idx % 2 === 0 ? "right" : "left", "spring", 0.5, 0.4)}
      initial="hidden"
      animate="show"
      whileHover={{ scale: 1.05 }}
      onClick={() => {
        navigate(`/${film.imdbID}`)
      }}
    >
      <img className="w-full rounded-t-lg" src={film.Poster} alt="" />
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
          {film.Title}
        </h5>
        <p className="mb-3 text-sm font-semibold text-gray-200">
          Released: {film.Year}
        </p>
        <p className="mb-3 font-normal text-white">{film.Plot === 'N/A' ? 'No plot provided' : film.Plot}</p>
      </div>
    </motion.div>
  )
}

export default FilmsListItem
