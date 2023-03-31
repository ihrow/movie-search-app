import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import MasonryLayout from './MasonryLayout'

const FilmsList = ({ setPage }) => {
  const intersectionRef = useRef()
  const { films, loading, error } = useSelector((state) => state.films)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setPage((prevPage) => prevPage + 1)
      }
    })
    setTimeout(() => {
      observer.observe(intersectionRef.current)
    }, 1000)
    return () => {
      observer.disconnect()
    }
  }, [])

  if (error) {
    return (
      <h3 className="mt-5 text-lg font-bold text-black">
        {error === 'Incorrect IMDb ID.' ? 'Enter movie name.' : error}
      </h3>
    )
  }

  return (
    <div className="flex flex-row flex-wrap items-center justify-center">
      {!error && <MasonryLayout films={films} />}
      {loading && (
        <div className="h-[50px] w-full text-center text-xl font-bold text-black">
          Loading...
        </div>
      )}
      <div className="w-full" ref={intersectionRef} />
    </div>
  )
}

export default FilmsList
