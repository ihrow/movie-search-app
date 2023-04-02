import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  films: [],
  loading: false,
  error: null,
  totalResults: 20,
};

const filmsSlice = createSlice({
  name: "films",
  initialState,
  reducers: {
    filmsFetch: (state) => {
      state.loading = true;
    },
    filmsFetchLoaded: (state) => {
      state.loading = false;
    },
    filmsFetchSuccess: (state, action) => {
      state.films = state.films.concat(action.payload);
      state.loading = false;
    },
    filmsFetchFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    filmsDataReset: (state) => {
      state.films = [];
      state.loading = false;
      state.error = null;
    },
    filmsTotalResults: (state, action) => {
      state.totalResults = action.payload;
    },
    filmsAddPlot: (state, action) => {
      state.films = state.films.map((film) => {
        if (film.imdbID === action.payload.imdbID) {
          return { ...film, Plot: action.payload.Plot };
        }
        return film;
      });
    },
  },
});

export const filmsActions = filmsSlice.actions;
export const filmsReducer = filmsSlice.reducer;
