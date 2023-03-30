import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useActions } from '../hooks/useActions'

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
      <div className='flex items-center justify-center flex-col'>
        <h1 className='text-3xl text-black font-bold'>Loading...</h1>
      </div>
    )
  }

  if (error) {
    return <h3>{error}</h3>
  }

  return (
    <div className='flex items-center justify-center flex-col'>
      <div className="flex flex-col items-center lg:flex-row justify-start lg:items-start w-full px-2 lg:px-48">
        <div className="flex flex-col justify-center items-center max-w-[500px] h-full">
          <img src={film.Poster} className='min-h-[300px] md:min-h-[500px] min-w-[168px] md:min-w-[281px]' alt="Film Poster" />
          {film.Metascore !== 'N/A' && <div className="mt-3 bg-orange-500 rounded-lg px-5 py-3 text-white font-bold">
            <span>Metascore: {film.Metascore}/100</span>
          </div>}
        </div>
        <div className="flex flex-col justify-start items-start ml-5 mt-3 lg:mt-0">
          <h1 className="text-3xl text-black font-bold">
            {film.Title} ({film.Year})
          </h1>
          <p className="mt-3 text-lg font-medium">{film.Plot === 'N/A' ? 'No plot provided' : film.Plot}</p>
          <h3 className="text-xl text-black font-bold my-3">About the film:</h3>
          <div className="grid grid-cols-3 gap-1">
            <div className="col-span-1 text-gray-light">Released</div>
            <div className="col-span-2 px-4">{film.Released}</div>
            <div className="col-span-1 text-gray-light">Director</div>
            <div className="col-span-2 px-4">{film.Director}</div>
            <div className="col-span-1 text-gray-light">Actors</div>
            <div className="col-span-2 px-4">{film.Actors}</div>
            <div className="col-span-1 text-gray-light">Genres</div>
            <div className="col-span-2 px-4">{film.Genre}</div>
            <div className="col-span-1 text-gray-light">Runtime</div>
            <div className="col-span-2 px-4">{film.Runtime}</div>
            <div className="col-span-1 text-gray-light">Country</div>
            <div className="col-span-2 px-4">{film.Country}</div>
          </div>
        </div>
      </div>
      <button
        className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-full mt-5"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
    </div>
  )
}

export default Film
