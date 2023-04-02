import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MainPage from './pages/MainPage'
import Film from './pages/Film'

const App = () => {
  return (
    <div className="min-h-[100vh] bg-gray-100 px-4 py-24 md:px-10">
      <Routes>
        <Route path="/*" element={<MainPage />} />
        <Route path="/:id" element={<Film />} />
      </Routes>
    </div>
  )
}

export default App
