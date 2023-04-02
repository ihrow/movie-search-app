/**
 * To make the app extendable, we will create a root reducer in a separate file.
 * This will allow us to add more reducers in the future.
 */
import { combineReducers } from '@reduxjs/toolkit'
import filmsSlice from './reducers/filmsSlice'
import singleFilmSlice from './reducers/singleFilmSlice'

const rootReducer = combineReducers({
  films: filmsSlice,
  singleFilm: singleFilmSlice,
})

export default rootReducer
