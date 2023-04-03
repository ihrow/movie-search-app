import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FilmsList, Search } from "../components";
import { getStorageValue } from "../helpers";
import { useActions } from "../hooks/useActions";
import { useDebounce } from "../hooks/useDebounce.js";
import { textVariant } from "../utils/motion";

export function MainPage() {
  const [searchQuery, setSearchQuery] = useState(
    getStorageValue("searchQuery", "John Wick")
  );
  const [page, setPage] = useState(1);
  const { fetchFilms, resetFilms } = useActions();
  const { error, totalResults } = useSelector((state) => state.films);
  const debouncedFetchFilms = useDebounce(fetchFilms, 500);

  useEffect(() => {
    /**
     * if page is greater than total pages, then return
     */
    if (page > Math.ceil(totalResults / 10)) {
      return;
    }

    debouncedFetchFilms(page, searchQuery.trim());
  }, [page, searchQuery]);

  useEffect(() => {
    resetFilms();
    setPage(1);
    window.localStorage.setItem("searchQuery", searchQuery);
  }, [searchQuery]);


  return (
    <div className="my-3 flex h-full w-full flex-col items-center justify-center text-center md:my-10">
      <motion.h1
        className="text-5xl font-bold text-black dark:text-white md:text-7xl"
        variants={textVariant(0.5)}
        initial="hidden"
        animate="show"
      >
        Find your
        <motion.span className="text-bg-gradient"> favourite </motion.span>
        movie.
      </motion.h1>
      <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <FilmsList setPage={setPage} />
      {page > Math.ceil(totalResults / 10) && !error && (
        <div className="mt-3 h-[50px] w-full text-center text-xl font-bold text-black dark:text-white">
          No more films
        </div>
      )}
    </div>
  );
}
