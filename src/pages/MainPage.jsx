import {useState, useEffect} from 'react';
import {FilmsList, Search} from '../components';
import {useActions} from '../hooks/useActions';
import {textVariant} from '../utils/motion';
import {useSelector} from 'react-redux';
import {motion} from 'framer-motion';
import {useDebounce} from "../hooks/useDebounce.js";
import {getStorageValue} from "../helpers";

export function MainPage() {
  const [searchQuery, setSearchQuery] = useState(getStorageValue('searchQuery', 'John Wick'))
  const [page, setPage] = useState(1)
  const {fetchFilms, resetFilms} = useActions()
  const {totalResults} = useSelector((state) => state.films)
  const debouncedFetchFilms = useDebounce(fetchFilms, 500)

  useEffect(() => {
    if (page > Math.ceil(totalResults / 10)) {
      return
    }

    debouncedFetchFilms(page, searchQuery.trim())
  }, [page, searchQuery])

  useEffect(() => {
    resetFilms()
    setPage(1)
    window.localStorage.setItem('searchQuery', searchQuery)
  }, [searchQuery])

  return (
    <div className="my-3 flex h-full w-full flex-col items-center justify-center text-center md:my-10">
      <motion.h1
        className="text-5xl font-bold text-black md:text-7xl"
        variants={textVariant(0.5)}
        initial="hidden"
        whileInView="show"
      >
        Find your
        <motion.span className="text-bg-gradient"> favourite </motion.span>movie.
      </motion.h1>
      <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
      <FilmsList setPage={setPage}/>
      {page > Math.ceil(totalResults / 10) && (
        <div className="mt-3 h-[50px] w-full text-center text-xl font-bold text-black">
          No more films
        </div>
      )}
    </div>
  )
}