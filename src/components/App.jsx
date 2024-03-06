import React from 'react';
import { HomePage } from '../pages/HomePage';
import { FavoritesPage } from '../pages/FavoritesPage';
import { NavBar } from '../components/NavBar';
import { Route, Routes } from 'react-router-dom';
import { MovieInfoPage } from '../pages/MovieInfoPage/MovieInfoPage';
import './style/App.scss';

export const App = () => {
  const options = { method: 'GET', headers: { accept: 'application/json' } };

  fetch('https://api.themoviedb.org/3/authentication', options)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
  return (
    <div className="movie-div">
      <Routes>
        <Route element={<NavBar />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          {/* <Route path={`/movie/${id}`} element={<MovieInfo />} /> */}
        </Route>
      </Routes>
    </div>
  );
};
