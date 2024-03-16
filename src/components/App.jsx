import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { HomePage } from '../pages/HomePage';
import { FavoritesPage } from '../pages/FavoritesPage';
import { NavBar } from './NavBar';
import { MovieInfoPage } from '../pages/MovieInfoPage';
import './style/App.scss';

export const App = ({ title }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YzJjNDU3N2FiNWY1MDAwMWRlNTBlMmQzYWVlMDgxMyIsInN1YiI6IjY1ZDQ2OGZiMDlkZGE0MDE4ODU4MDYzNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qg910gKgtA4qwRkHbQFWbYQLbpPR5H7vR9sO3rtqkMM',
      },
    };
    fetch(
      'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',
      options,
    )
      .then((response) => response.json())
      .then((data) => setData(data.results))
      .catch((err) => console.error(err));
  }, []);
  console.log('title: ', title);
  return (
    <div className="movie-div">
      <Routes>
        {data.map(
          ({
            id,
            title,
            original_title,
            vote_average,
            poster_path,
            release_date,
            overview,
          }) => {
            return (
              <Route element={<NavBar />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/favorites" element={<FavoritesPage />} />
                <Route
                  path="/movie/:movieid"
                  element={
                    <MovieInfoPage
                      title={title}
                      original_title={original_title}
                      vote_average={vote_average}
                      poster_path={poster_path}
                      release_date={release_date}
                      overview={overview}
                    />
                  }
                />
              </Route>
            );
          },
        )}
      </Routes>
    </div>
  );
};
