import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { HomePage } from '../pages/HomePage';
import { FavoritesPage } from '../pages/FavoritesPage';
import { Layout } from './Layout';
import { MovieInfoPage } from '../pages/MovieInfoPage';
import { getRequest } from '../utils/url';
import './style/App.scss';
import { PAGES } from '../constants';
import { addGenres } from '../redux/slices';

export const App = () => {
  const dispatch = useDispatch();

  const [genLoading, setGenLoading] = useState(true);
  const { i18n } = useTranslation();

  useEffect(() => {
    getRequest('genre/movie/list?', i18n.language, 1)
      .then(({ genres }) => {
        setGenLoading(false);
        dispatch(addGenres({ genres }));
      })
      .catch(() => {
        setGenLoading(false);
      });
  }, [dispatch, i18n.language]);

  return (
    <div className="movie-div">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route element={<Layout />}>
          <Route
            path={PAGES.HOME}
            element={<HomePage genLoading={genLoading} />}
          />
          <Route path={PAGES.FAVORITES} element={<FavoritesPage />} />
          <Route path={`${PAGES.MOVIE}/:movieId`} element={<MovieInfoPage />} />
        </Route>
      </Routes>
    </div>
  );
};
