import React from 'react';
import '../../pages/Favorites/FavoritesPage.scss';
import { MovieList } from '../../components/MovieList/MovieList';
import farstar from '../../images/far star.svg';

export const FavoritesPage = ({ activebounding }) => {
  return (
    <div className="saved-movie container">
      <h1 className="saved-movie__page-head">Favorites</h1>
      <MovieList
        activebounding={
          <img className="saved-movie__bounding" src={farstar} alt="" />
        }
      />
    </div>
  );
};
