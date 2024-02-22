import React from 'react';
import './SearchBar.scss';
import { NavBar } from '../NavBar/NavBar';
import { MovieList } from '../MovieList/MovieList';

export const SearchBar = () => {
  return (
    <section className="FilmsList">
      <NavBar />
      <input
        className="SearchingBar"
        type="text"
        placeholder="Write film name..."
      />
      <MovieList />
    </section>
  );
};
