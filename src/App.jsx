import { Routes, Route } from 'react-router-dom';
import { MainPage, FilmPage } from './pages';

const App = () => {
  return (
    <div className="min-h-[100vh] bg-gray-100 px-4 py-24 md:px-10">
      <Routes>
        <Route path="/*" element={<MainPage />} />
        <Route path="/:id" element={<FilmPage />} />
      </Routes>
    </div>
  )
}

export default App
