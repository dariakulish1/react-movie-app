import React from 'react';
import '../../pages/Favorites/Favorites.scss';
import { NavLink } from 'react-router-dom';

export const Favorites = () => {
  return (
    <header className="NavTop">
      <NavLink to="/" className="NameLabel">
        STRICHKA
      </NavLink>
      <NavLink className="FavoriteMovie" to="/favorites">
        Favorites
      </NavLink>
    </header>
  );
};
