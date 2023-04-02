import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  film: {},
  loading: false,
  error: null,
};

const singleFilmSlice = createSlice({
  name: "singleFilm",
  initialState,
  reducers: {
    fetchFilm: (state) => {
      state.loading = true;
    },
    fetchFilmSuccess: (state, action) => {
      state.film = action.payload;
      state.loading = false;
    },
    fetchFilmError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const singleFilmActions = singleFilmSlice.actions;
export const singleFilmReducer = singleFilmSlice.reducer;
