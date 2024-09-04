import { createSlice } from '@reduxjs/toolkit';

export const genresSlice = createSlice({
  name: 'genres',
  initialState: [],
  reducers: {
    addGenres: (state, action) => {
      return action.payload.genres;
    },
  },
});

export const { addGenres } = genresSlice.actions;

export default genresSlice.reducer;
