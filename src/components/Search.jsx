import React from 'react'
import { motion } from 'framer-motion'
import useDebounce from '../hooks/useDebounce'
import { AiOutlineSearch } from 'react-icons/ai'
import { fadeIn } from '../utils/motion'

const Search = ({ setSearchQuery }) => {
  const debouncedSearch = useDebounce(setSearchQuery, 1000)

  return (
    <div className="my-6 flex w-full items-center justify-center text-center md:my-16 ">
      <motion.div
        variants={fadeIn('up', 'tween', 0.2, 0.3)}
        initial="hidden"
        whileInView="show"
        whileHover={{ scale: 1.05 }}
        className="relative flex h-20 w-full items-center justify-start md:w-1/2"
      >
        <AiOutlineSearch className="absolute ml-2 text-black" fontSize={32} />
        <motion.input
          className="h-16 w-full rounded-lg border border-black bg-white px-12 text-lg font-bold text-black placeholder:font-medium placeholder:italic placeholder:text-black focus:outline-none"
          type="text"
          placeholder="Star Wars..."
          onChange={(e) => debouncedSearch(e.target.value)}
        />
      </motion.div>
    </div>
  )
}

export default Search
