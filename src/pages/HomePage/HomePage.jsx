import React from 'react';
import './HomePage.scss';
import { MovieList } from '../../components/MovieList/MovieList';

export const HomePage = () => {
  return (
    <section className="films-list container">
      <input
        className="films-list__input"
        type="text"
        placeholder="Write film name..."
      />
      <MovieList />
    </section>
  );
};
