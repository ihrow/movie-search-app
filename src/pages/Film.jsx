import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useActions } from '../hooks/useActions'
import noPoster from '../assets/no-poster.jpg'

const Film = () => {
  const { id } = useParams()
  const { fetchFilm } = useActions()
  const { film, loading, error } = useSelector((state) => state.singleFilm)
  const navigate = useNavigate()

  useEffect(() => {
    fetchFilm(id)
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
        <div className="flex h-full max-w-[500px] flex-col items-center justify-center">
          <img
            src={film.Poster === 'N/A' ? noPoster : film.Poster}
            className="min-h-[300px] min-w-[168px] md:min-h-[500px] md:min-w-[281px]"
            alt="Film Poster"
          />
          {film.Metascore !== 'N/A' && (
            <div className="mt-3 rounded-lg bg-orange-500 px-5 py-3 font-bold text-white">
              <span>Metascore: {film.Metascore}/100</span>
            </div>
          )}
        </div>
        <div className="ml-5 mt-3 flex flex-col items-start justify-start lg:mt-0">
          <h1 className="text-3xl font-bold text-black">
            {film.Title} ({film.Year})
          </h1>
          <p className="mt-3 text-lg font-medium">
            {film.Plot === 'N/A' ? 'No plot provided' : film.Plot}
          </p>
          <h3 className="my-3 text-xl font-bold text-black">About the film:</h3>
          <div className="grid grid-cols-3 gap-1">
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
          </div>
        </div>
      </div>
      <button
        className="mt-5 rounded-full bg-orange-500 px-4 py-2 font-bold text-white hover:bg-orange-700"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
    </div>
  )
}

export default Film
