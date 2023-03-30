import React from 'react'
import { motion } from 'framer-motion'
import useDebounce from '../hooks/useDebounce'
import { AiOutlineSearch } from 'react-icons/ai'
import { fadeIn } from '../utils/motion'

const Search = ({ setSearchQuery }) => {
  const debouncedSearch = useDebounce(setSearchQuery, 1000)

  return (
    <div className="w-full flex justify-center items-center text-center mt-10">
      <motion.div
        variants={fadeIn('up', 'tween', 0.2, 0.3)}
        initial="hidden"
        whileInView="show"
        whileHover={{ scale: 1.05 }}
        className="relative flex justify-start items-center w-full md:w-1/2 h-20"
      >
        <AiOutlineSearch className="absolute text-white ml-2" fontSize={32} />
        <motion.input
          className="w-full h-16 bg-pink-300 text-lg font-bold text-white placeholder:text-white rounded-lg border-none focus:outline-none px-12"
          type="text"
          placeholder="Search... e.g. Star Wars"
          onChange={(e) => debouncedSearch(e.target.value)}
        />
      </motion.div>
    </div>
  )
}

export default Search
