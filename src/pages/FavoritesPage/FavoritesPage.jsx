import React from 'react';
import './FavoritesPage.scss';
import { MovieList } from '../../components/MovieList';
import farstar from '../../images/far star.svg';
import PropTypes from 'prop-types';

const propTypes = {
  activebounding: PropTypes.shape.isRequired,
};

export const FavoritesPage = ({ activebounding }) => {
  return (
    <div className="saved-movie container">
      <h1 className="saved-movie__page-head">Favorites</h1>
      <MovieList
        activebounding={
          <img className="saved-movie__bounding" src={farstar} alt="far-star" />
        }
      />
    </div>
  );
};

FavoritesPage.propTypes = propTypes;
