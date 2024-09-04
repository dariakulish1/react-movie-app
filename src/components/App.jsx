import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HomePage } from '../pages/HomePage';
import { FavoritesPage } from '../pages/FavoritesPage';
import { Layout } from './Layout';
import { MovieInfoPage } from '../pages/MovieInfoPage';
import { getRequest } from '../utils/url';
import './style/App.scss';
import { PAGES } from '../constants';
import { addGenres } from '../redux/slices';
import { genresSelector } from '../redux/selectors';

export const App = () => {
  const dispatch = useDispatch();
  const genres = useSelector(genresSelector);

  // const [genres, setGenres] = useState([]);
  const [genLoading, setGenLoading] = useState(true);

  useEffect(() => {
    getRequest('genre/movie/list?')
      .then(({ genres }) => {
        // setGenres(data.genres);
        setGenLoading(false);
        dispatch(addGenres({ genres }));
      })
      .catch(() => {
        setGenLoading(false);
      });
  }, [dispatch]);

  return (
    <div className="movie-div">
      <Routes>
        <Route element={<Layout />}>
          <Route
            path={PAGES.HOME}
            element={<HomePage genLoading={genLoading} />}
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
