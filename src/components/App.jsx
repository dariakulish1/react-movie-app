import React from 'react';
import { SearchBar } from './SearchBar/SearchBar';
import { Favorites } from '../pages/Favorites/Favorites';
import { Route, Routes } from 'react-router-dom';
import './style/App.scss';

export const App = () => {
  const options = { method: 'GET', headers: { accept: 'application/json' } };

  fetch('https://api.themoviedb.org/3/authentication', options)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
  return (
    <div className="MovieDiv">
      <Routes>
        <Route path="/" element={<SearchBar />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </div>
  );
};
