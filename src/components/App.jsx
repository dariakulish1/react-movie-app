import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { HomePage } from '../pages/HomePage';
import { FavoritesPage } from '../pages/FavoritesPage';
import { Layout } from './Layout';
import { MovieInfoPage } from '../pages/MovieInfoPage';
import './style/App.scss';
import { PAGES } from '../constants';

export const App = () => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YzJjNDU3N2FiNWY1MDAwMWRlNTBlMmQzYWVlMDgxMyIsInN1YiI6IjY1ZDQ2OGZiMDlkZGE0MDE4ODU4MDYzNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qg910gKgtA4qwRkHbQFWbYQLbpPR5H7vR9sO3rtqkMM',
      },
    };

    fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
      .then((response) => response.json())
      .then((data) => {
        setGenres(data?.genres);
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
          <Route path={`${PAGES.MOVIE}/:movieid`} element={<MovieInfoPage />} />
        </Route>
      </Routes>
    </div>
  );
};
