import axios from "axios";
import { filmsActions } from "../reducers/filmsSlice.js";

export const fetchFilms = (page, searchQuery) => async (dispatch, getState) => {
  const filmList = getState().films.films;
  dispatch(filmsActions.filmsFetch());
  const response = await axios.get(
    `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_KEY}`,
    {
      params: { s: searchQuery, page },
    }
  );

  if (response.data.Error) {
    if (filmList.length === 0) {
      dispatch(filmsActions.filmsFetchFailure(response.data.Error));
      return;
    }

    // if we have films in the list, we don't want to show an error
    dispatch(filmsActions.filmsFetchLoaded());
    return;
  }
  dispatch(filmsActions.filmsFetchSuccess(response.data.Search));
  dispatch(filmsActions.filmsTotalResults(response.data.totalResults));
};

export const resetFilms = () => (dispatch) => {
  dispatch(filmsActions.filmsDataReset());
};

export const fetchFilmPlot = (id) => async (dispatch) => {
  const response = await axios.get(
    `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_KEY}`,
    {
      params: { i: id },
    }
  );
  if (response.data.Error) {
    dispatch(filmsActions.filmsFetchFailure(response.data.Error));
    return;
  }
  dispatch(filmsActions.filmsAddPlot(response.data));
};
