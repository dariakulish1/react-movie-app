import { Route, Routes } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { FavoritesPage } from '../pages/FavoritesPage';
import { NavBar } from './NavBar';
import { MovieInfoPage } from '../pages/MovieInfoPage';
import './style/App.scss';
import { PAGES } from '../constants';

export const App = () => {
  return (
    <div className="movie-div">
      <Routes>
        <Route element={<NavBar />}>
          <Route path={PAGES.HOME} element={<HomePage />} />
          <Route path={PAGES.FAVORITES} element={<FavoritesPage />} />
          <Route path={`${PAGES.MOVIE}/:movieid`} element={<MovieInfoPage />} />
        </Route>
      </Routes>
    </div>
  );
};
