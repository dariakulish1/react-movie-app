import './FavoritesPage.scss';
import { NavLink } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';
import { FlexBoxes } from '../../components/FlexBoxes';
import { Spinner } from '../../components/Spinner';
import { getMovieInfo } from '../../services/getMovieInfo';
import { PAGES } from '../../constants';

export const FavoritesPage = () => {
  const [data, setData] = useState([]);
  const [isError, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const savedMovieInfo = localStorage.getItem('savedMovies') ?? '[]';
  const savedMovieInfoArr = useMemo(() => {
    return JSON.parse(savedMovieInfo);
  }, [savedMovieInfo]);

  useEffect(() => {
    const promise = savedMovieInfoArr.map((movieId) => getMovieInfo(movieId));
    Promise.all(promise)
      .then((movie) => {
        setData(movie);
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
      });
  }, [savedMovieInfoArr]);

  if (loading) {
    return (
      <div className="spinner container">
        <Spinner />
        This page is loading...
      </div>
    );
  }
  if (isError) {
    return (
      <div className="error-message container">
        <p>Sorry, it is error</p>
        <NavLink to={PAGES.HOME} className="link-to-home">
          Home
        </NavLink>
      </div>
    );
  }

  return (
    <div className="saved-movie container inter">
      <h1 className="saved-movie__page-head">Favorites</h1>
      <div className="saved-movie__favorites-list">
        {data.map(
          ({
            posterPath,
            voteAverage,
            title,
            originalTitle,
            savedMovieInfoArr,
            genres,
            id,
          }) => {
            const allGenres =
              genres
                ?.map((genre) => genre.name)
                .slice(0, 3)
                .join(' • ') ?? [];
            console.log('genres', allGenres);

            return (
              <FlexBoxes
                key={posterPath}
                posterPath={posterPath}
                voteAverage={voteAverage}
                title={title}
                originalTitle={originalTitle}
                allGenres={allGenres}
                movieId={id}
              />
            );
          },
        )}
      </div>
    </div>
  );
};
