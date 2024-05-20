import './NavBar.scss';
import { NavLink, Outlet } from 'react-router-dom';
import cinefilm from '../../images/far magnifying-glass.svg';
import { PAGES } from '../../constants';

export const NavBar = () => {
  return (
    <div className="nav-div">
      <header className="nav-div__nav-top">
        <div className="nav-div__pages">
          <NavLink to={PAGES.HOME} className="nav-div__name-label">
            <img
              className="nav-div__label-img"
              src={cinefilm}
              alt="label-img"
            />
            Strichka
          </NavLink>
          <NavLink className="nav-div__favorite-movie" to={PAGES.FAVORITES}>
            Favorites
          </NavLink>
        </div>
      </header>
      <Outlet />
    </div>
  );
};
