import PropTypes from 'prop-types';
import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { HomePage } from '../pages/HomePage';
import { FavoritesPage } from '../pages/FavoritesPage';
import { NavBar } from './NavBar';
import { MovieInfoPage } from '../pages/MovieInfoPage';
import './style/App.scss';

const propTypes = {
  elements: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    original_title: PropTypes.string.isRequired,
    vote_average: PropTypes.number.isRequired,
    poster_path: PropTypes.shape.isRequired,
  }).isRequired,
};
export const App = ({ title }) => {
  return (
    <div className="movie-div">
      <Routes>
        <Route element={<NavBar />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/movie/:movieid" element={<MovieInfoPage />} />
        </Route>
      </Routes>
    </div>
  );
};
App.propTypes = propTypes;
