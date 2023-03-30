import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import MasonryLayout from './MasonryLayout'

const FilmsList = ({ setPage }) => {
  const intersectionRef = useRef()
  const {films, loading, error,} = useSelector(state => state.films)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setPage(prevPage => prevPage + 1)
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
      <h3 className='font-bold mt-5 text-lg text-black'>
        {error === 'Incorrect IMDb ID.' ? 'Enter movie name.' : error}
      </h3>
    );
  }

  return (
    <div className='flex flex-row justify-center items-center flex-wrap'>
      {!error && <MasonryLayout films={films} />}
      {loading && <div className="w-full h-[50px] text-center text-black font-bold text-xl">Loading...</div>}
      <div className='w-full' ref={intersectionRef} />
    </div>
  )
}

export default FilmsList