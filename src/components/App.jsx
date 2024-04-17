import { Route, Routes } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { FavoritesPage } from '../pages/FavoritesPage';
import { NavBar } from './NavBar';
import { MovieInfoPage } from '../pages/MovieInfoPage';
import './style/App.scss';

export const App = () => {
  return (
    <div className="movie-div">
      <Routes>
        <Route element={<NavBar />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/movie/:movieid" element={<MovieInfoPage />} />
        </Route>
      </Routes>
    </div>
  );
};
