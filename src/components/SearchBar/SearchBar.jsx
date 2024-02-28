import React from 'react';
import './SearchBar.scss';
import { MovieList } from '../MovieList/MovieList';

export const SearchBar = () => {
  return (
    <section className="films-list container">
      <input
        className="films-list__input"
        type="text"
        placeholder="Write film name..."
      />
      <MovieList />
    </section>
  );
};
