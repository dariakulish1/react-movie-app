import './FavoritesPage.scss';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { MovieList } from '../../components/MovieList';
import { Spinner } from '../../components/Spinner';
import { getMovieInfo } from '../../services/getMovieInfo';

export const FavoritesPage = () => {
  const { movieId } = useParams();
  const [data, setData] = useState({});
  const [isError, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMovieInfo(movieId)
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
      });
  }, [movieId]);

  if (loading) {
    return (
      <div>
        <Spinner className="spinner container" />
        This page is loading...
      </div>
    );
  }
  if (isError) {
    return <div className="container">Sorry, it is error</div>;
  }
  return (
    <div className="saved-movie container inter">
      <h1 className="saved-movie__page-head">Favorites</h1>
      <MovieList />
    </div>
  );
};
