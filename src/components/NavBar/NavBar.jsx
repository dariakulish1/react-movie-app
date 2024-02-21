import React from 'react';
import './NavBar.scss';
import { NavLink } from 'react-router-dom';
import { CineFilm } from '../../images/far magnifying-glass.svg';

export const NavBar = () => {
  return (
    <>
      <div className="NavDiv">
        <header className="NavTop">
          <NavLink to="/" className="NameLabel">
            STRICHKA
          </NavLink>
          <NavLink className="FavoriteMovie" to="/favorites">
            Favorites
          </NavLink>
        </header>
      </div>
    </>
  );
};
