import axios from "axios";
import { singleFilmSlice } from "../reducers/singleFilmSlice";

export const fetchFilm = (id) => async (dispatch) => {
  dispatch(singleFilmSlice.actions.fetchFilm());
  const response = await axios.get(
    `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_KEY}`,
    {
      params: { i: id, plot: "full" },
    }
  );
  if (response.data.Error) {
    dispatch(singleFilmSlice.actions.fetchFilmError(response.data.Error));
    return;
  }
  dispatch(singleFilmSlice.actions.fetchFilmSuccess(response.data));
};
