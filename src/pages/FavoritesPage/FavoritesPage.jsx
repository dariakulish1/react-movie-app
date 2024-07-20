import './FavoritesPage.scss';
import { useEffect, useState } from 'react';
import { FlexBoxes } from '../../components/FlexBoxes';
import { Spinner } from '../../components/Spinner';
import { getMovieInfo } from '../../services/getMovieInfo';

export const FavoritesPage = () => {
  const [data, setData] = useState({});
  const [isError, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const savedMovieInfo = localStorage.getItem('savedMovies') ?? '[]';
  const savedMovieInfoArr = JSON.parse(savedMovieInfo);
  console.log(savedMovieInfoArr[3]);
  useEffect(() => {
    getMovieInfo(savedMovieInfoArr[3])
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
      });
  }, []);

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
      <FlexBoxes
        key={savedMovieInfoArr}
        genresIds={[]}
        originalTitle={data.originalTitle}
        genres={[]}
        posterPath={data.posterPath}
        movieId={savedMovieInfoArr[3]}
        voteAverage={data.voteAverage}
        title={data.title}
      />
    </div>
  );
};
