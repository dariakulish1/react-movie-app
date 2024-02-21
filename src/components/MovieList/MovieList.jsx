import React from 'react';
import './MovieList.scss';
import { NavBar } from '../NavBar/NavBar';

export const MovieList = () => {
  return (
    <section className="FilmsList">
      <NavBar />
      <input
        className="SearchingBar"
        type="text"
        placeholder="Write film name..."
      />
      <div className="DivList">
        <div className="FlexBox"></div>
        <div className="FlexBox"></div>
        <div className="FlexBox"></div>
        <div className="FlexBox"></div>
        <div className="FlexBox"></div>
        <div className="FlexBox"></div>
      </div>
    </section>
  );
};
