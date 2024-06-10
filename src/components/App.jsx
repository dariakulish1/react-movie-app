import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { HomePage } from '../pages/HomePage';
import { FavoritesPage } from '../pages/FavoritesPage';
import { Layout } from './Layout';
import { MovieInfoPage } from '../pages/MovieInfoPage';
import { headers } from '../utils/headers';
import { getUrl } from '../utils/url';
import './style/App.scss';
import { PAGES } from '../constants';

export const App = () => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const options = {
      method: 'GET',
      headers,
    };

    fetch(getUrl('genre/movie/list?'), options)
      .then((response) => response.json())
      .then((data) => {
        setGenres(data?.genres ?? []);
        console.log('genres ', data.genres);
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <div className="movie-div">
      <Routes>
        <Route element={<Layout />}>
          <Route path={PAGES.HOME} element={<HomePage genres={genres} />} />
          <Route path={PAGES.FAVORITES} element={<FavoritesPage />} />
          <Route
            path={`${PAGES.MOVIE}/:movieid`}
            element={<MovieInfoPage genres={genres} />}
          />
        </Route>
      </Routes>
    </div>
  );
};
