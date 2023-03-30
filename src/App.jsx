import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MainPage from './pages/MainPage'
import Film from './pages/Film'

const App = () => {
  return (
    /**
     * API is not so good to be honest. 
     */
    <div className="background-gradient min-h-[100vh] px-4 md:px-10 py-24">
      <Routes>
        <Route path="/*" element={<MainPage />} />
        <Route path="/:id" element={<Film />} />
      </Routes>
    </div>
  )
}

export default App
