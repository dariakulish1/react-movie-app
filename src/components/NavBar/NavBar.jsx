import React from 'react';
import './NavBar.scss';
import { NavLink, Outlet } from 'react-router-dom';
import cinefilm from '../../images/far magnifying-glass.svg';

export const NavBar = () => {
  return (
    <>
      <div className="nav-div">
        <header className="nav-div__nav-top">
          <div className="nav-div__pages">
            <NavLink to="/" className="nav-div__name-label">
              <img
                className="nav-div__label-img"
                src={cinefilm}
                alt="label-img"
              />
              STRICHKA
            </NavLink>
            <NavLink className="nav-div__favorite-movie" to="/favorites">
              Favorites
            </NavLink>
          </div>
        </header>
        <Outlet />
      </div>
    </>
  );
};
