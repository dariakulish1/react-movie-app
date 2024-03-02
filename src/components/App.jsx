import React from 'react';
import { HomePage } from '../pages/HomePage/HomePage';
import { FavoritesPage } from '../pages/Favorites/FavoritesPage';
import { NavBar } from '../components/NavBar/NavBar';
import { Route, Routes } from 'react-router-dom';
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
        </Route>
      </Routes>
    </div>
  );
};
