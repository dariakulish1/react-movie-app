import React from 'react';
import { NavBar } from './NavBar/NavBar';
import { MovieList } from './MovieList/MovieList';
import './style/MovieApp.scss';

export const MovieApp = () => {
  const options = { method: 'GET', headers: { accept: 'application/json' } };

  fetch('https://api.themoviedb.org/3/authentication', options)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
  return (
    <div className="MovieDiv">
      <NavBar />
      <MovieList />
    </div>
  );
};
