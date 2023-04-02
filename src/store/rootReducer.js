/**
 * To make the app extendable, we will create a root reducer in a separate file.
 * This will allow us to add more reducers in the future.
 */
import { combineReducers } from "@reduxjs/toolkit";
import { filmsReducer } from "./reducers/filmsSlice.js";
import { singleFilmReducer } from "./reducers/singleFilmSlice.js";

export const rootReducer = combineReducers({
  films: filmsReducer,
  singleFilm: singleFilmReducer,
});
