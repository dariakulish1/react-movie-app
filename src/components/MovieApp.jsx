import React from 'react';
import { NavBar } from './NavBar/NavBar';
import { MovieList } from './MovieList/MovieList';
import './style/MovieApp.scss';

export const MovieApp = () => {
  return (
    <div className="MovieDiv">
      <NavBar />
      <MovieList />
    </div>
  );
};
