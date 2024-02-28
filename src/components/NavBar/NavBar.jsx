import React from 'react';
import './NavBar.scss';
import { NavLink, Outlet } from 'react-router-dom';
import cinefilm from '../../images/far magnifying-glass.svg';

export const NavBar = () => {
  return (
    <>
      <div className="nav-div container">
        <header className="NavTop">
          <NavLink to="/" className="NameLabel">
            <img src={cinefilm} />
            STRICHKA
          </NavLink>
          <NavLink className="FavoriteMovie" to="/favorites">
            Favorites
          </NavLink>
        </header>
        <Outlet />
      </div>
    </>
  );
};
