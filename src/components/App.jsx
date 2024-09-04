import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { HomePage } from '../pages/HomePage';
import { FavoritesPage } from '../pages/FavoritesPage';
import { Layout } from './Layout';
import { MovieInfoPage } from '../pages/MovieInfoPage';
import { getRequest } from '../utils/url';
import './style/App.scss';
import { PAGES } from '../constants';

export const App = () => {
  const [genres, setGenres] = useState([]);
  const [genLoading, SetGenLoading] = useState(true);

  useEffect(() => {
    getRequest('genre/movie/list?')
      .then((data) => {
        setGenres(data.genres);
        SetGenLoading(false);
      })
      .catch(() => {
        SetGenLoading(false);
      });
  }, []);

  return (
    <div className="movie-div">
      <Routes>
        <Route element={<Layout />}>
          <Route
            path={PAGES.HOME}
            element={<HomePage genres={genres} genLoading={genLoading} />}
          />
          <Route path={PAGES.FAVORITES} element={<FavoritesPage />} />
          <Route
            path={`${PAGES.MOVIE}/:movieId`}
            element={<MovieInfoPage genres={genres} />}
          />
        </Route>
      </Routes>
    </div>
  );
};
