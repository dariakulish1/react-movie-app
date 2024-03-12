import { Route, Routes } from 'react-router-dom';
import React, { useState } from 'react';
import { HomePage } from '../pages/HomePage';
import { FavoritesPage } from '../pages/FavoritesPage';
import { NavBar } from './NavBar';
import { MovieInfoPage } from '../pages/MovieInfoPage';
import './style/App.scss';

export const App = () => {
  const [id, setId] = useState(null);
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YzJjNDU3N2FiNWY1MDAwMWRlNTBlMmQzYWVlMDgxMyIsInN1YiI6IjY1ZDQ2OGZiMDlkZGE0MDE4ODU4MDYzNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qg910gKgtA4qwRkHbQFWbYQLbpPR5H7vR9sO3rtqkMM',
    },
  };

  fetch('https://api.themoviedb.org/3/movie/changes?page=1', options)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
  return (
    <div className="movie-div">
      <Routes>
        <Route element={<NavBar />}>
          <Route path="/" element={<HomePage id={id} />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/movie/:movieid" element={<MovieInfoPage />} />
        </Route>
      </Routes>
    </div>
  );
};
