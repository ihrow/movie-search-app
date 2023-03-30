import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    film: {},
    loading: false,
    error: null,
}

export const singleFilmSlice = createSlice({
    name: 'singleFilm',
    initialState,
    reducers: {
        fetchFilm: (state) => {
            state.loading = true
        },
        fetchFilmSuccess: (state, action) => {
            state.film = action.payload
            state.loading = false
        },
        fetchFilmError: (state, action) => {
            state.error = action.payload
            state.loading = false
        }
    },

})

export default singleFilmSlice.reducer