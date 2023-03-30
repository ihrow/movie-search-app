import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MainPage from './pages/MainPage'
import Film from './pages/Film'

const App = () => {
  return (
    <div className="background-gradient min-h-[100vh] px-10 py-24">
      <Routes>
        <Route path="/*" element={<MainPage />} />
        <Route path="/:id" element={<Film />} />
      </Routes>
    </div>
  )
}

export default App
