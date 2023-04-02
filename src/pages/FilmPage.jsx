import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { useActions } from '../hooks/useActions';
import { motion } from 'framer-motion';
import { fadeIn } from '../utils/motion';
import noPoster from '../assets/no-poster.jpg';
import {validateStringStartsWith} from "../helpers/string.js";
import {singleFilmActions } from "../store/reducers/singleFilmSlice.js";

export function FilmPage() {
  const dispatch = useDispatch()
  const { id } = useParams()
  const { fetchFilm } = useActions()
  const { film, loading, error } = useSelector((state) => state.singleFilm)
  const navigate = useNavigate()

  useEffect( () => {

    if (!validateStringStartsWith(id, 'tt')) {
      dispatch(singleFilmActions.fetchFilmError('Incorrect IMDb ID.'));
      return;
    }

    fetchFilm(id);

  }, [id])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-black">Loading...</h1>
      </div>
    )
  }

  if (error) {
    return <h3>{error}</h3>
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex w-full flex-col items-center justify-start px-2 lg:flex-row lg:items-start lg:px-48">
        <motion.div
          className="flex h-full max-w-[500px] flex-col items-center justify-center"
          variants={fadeIn('right', 'spring', 0.3, 0.5)}
          initial="hidden"
          animate="show"
        >
          <img
            src={film.Poster === 'N/A' ? noPoster : film.Poster}
            className="min-h-[300px] min-w-[168px] md:min-h-[500px] md:min-w-[281px]"
            alt="FilmPage Poster"
          />
          {film.Metascore !== 'N/A' && (
            <div className="mt-3 rounded-lg bg-orange-500 px-5 py-3 font-bold text-white">
              <span>Metascore: {film.Metascore}/100</span>
            </div>
          )}
        </motion.div>
        <div className="ml-5 mt-3 flex flex-col items-start justify-start lg:mt-0">
          <motion.h1
            className="text-3xl font-bold text-black"
            variants={fadeIn('up', 'spring', 0.5, 0.5)}
            initial="hidden"
            animate="show"
          >
            {film.Title} ({film.Year})
          </motion.h1>
          <motion.p
            className="mt-3 text-lg font-medium"
            variants={fadeIn('up', 'spring', 0.7, 0.5)}
            initial="hidden"
            animate="show"
          >
            {film.Plot === 'N/A' ? 'No plot provided' : film.Plot}
          </motion.p>
          <motion.h3
            className="my-3 text-xl font-bold text-black"
            variants={fadeIn('up', 'spring', 0.9, 0.5)}
            initial="hidden"
            animate="show"
          >
            About the film:
          </motion.h3>
          <motion.div
            className="grid grid-cols-3 gap-1"
            variants={fadeIn('up', 'spring', 1.1, 0.5)}
            initial="hidden"
            animate="show"
          >
            <div className="text-gray-light col-span-1">Released</div>
            <div className="col-span-2 px-4">{film.Released}</div>
            <div className="text-gray-light col-span-1">Director</div>
            <div className="col-span-2 px-4">{film.Director}</div>
            <div className="text-gray-light col-span-1">Actors</div>
            <div className="col-span-2 px-4">{film.Actors}</div>
            <div className="text-gray-light col-span-1">Genres</div>
            <div className="col-span-2 px-4">{film.Genre}</div>
            <div className="text-gray-light col-span-1">Runtime</div>
            <div className="col-span-2 px-4">{film.Runtime}</div>
            <div className="text-gray-light col-span-1">Country</div>
            <div className="col-span-2 px-4">{film.Country}</div>
          </motion.div>
        </div>
      </div>
      <motion.button
        variants={fadeIn('up', 'spring', 1.3, 0.5)}
        initial="hidden"
        animate="show"
        whileHover={{ scale: 1.1 }}
        className="mt-5 rounded-full bg-orange-500 px-12 py-4 text-xl font-bold text-white hover:bg-orange-700"
        onClick={() => navigate(-1)}
      >
        Back
      </motion.button>
    </div>
  )
}