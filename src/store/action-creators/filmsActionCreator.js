import axios from "axios";
import { filmsSlice } from "../reducers/filmsSlice";

export const fetchFilms = (page, searchQuery) => async (dispatch) => {
    dispatch(filmsSlice.actions.filmsFetch())
    const response = await axios.get(`https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_KEY}`, {
        params: { s: searchQuery, page }
    })
    if (response.data.Error) {
        dispatch(filmsSlice.actions.filmsFetchFailure(response.data.Error))
        return
    }
    dispatch(filmsSlice.actions.filmsFetchSuccess(response.data.Search))
    dispatch(filmsSlice.actions.filmsTotalResults(response.data.totalResults))
}

export const resetFilms = () => (dispatch) => {
    dispatch(filmsSlice.actions.filmsDataReset())
}

export const fetchFilmPlot = (id) => async (dispatch) => {
    const response = await axios.get(`https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_KEY}`, {
        params: { i: id }
    })
    console.log(response.data)
    if (response.data.Error) {
        dispatch(filmsSlice.actions.filmsFetchFailure(response.data.Error))
        return
    }
    dispatch(filmsSlice.actions.filmsAddPlot(response.data))
}