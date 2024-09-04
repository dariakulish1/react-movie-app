import { configureStore } from '@reduxjs/toolkit';
import genresReducer from './slices/genres.reducer';

export const store = configureStore({
  reducer: {
    genres: genresReducer,
  },
});
