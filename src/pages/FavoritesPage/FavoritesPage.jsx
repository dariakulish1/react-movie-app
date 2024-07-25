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
  console.log(savedMovieInfoArr[0]);
  useEffect(() => {
    getMovieInfo(savedMovieInfoArr[0])
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
      });
  }, [savedMovieInfoArr[0]]);

  console.log('dataID', data.genres?.[0].id);

  if (loading) {
    return (
      <div className="spinner container">
        <Spinner />
        This page is loading...
      </div>
    );
  }
  if (isError) {
    return <div className="container">Sorry, it is error</div>;
  }

  const allGenres =
    data.genres
      ?.map((genre) => genre.name)
      .slice(0, 3)
      .join(' • ') ?? [];
  console.log('genres', allGenres);

  return (
    <div className="saved-movie container inter">
      <h1 className="saved-movie__page-head">Favorites</h1>
      {/* {data.map(
        ({
          posterPath,
          voteAverage,
          title,
          originalTitle,
          savedMovieInfoArr,
          allGenres,
        }) => {
          return ( */}
      <FlexBoxes
        key={savedMovieInfoArr}
        posterPath={data.posterPath}
        voteAverage={data.voteAverage}
        title={data.title}
        originalTitle={data.originalTitle}
        allGenres={allGenres}
        movieId={savedMovieInfoArr}
      />
      {/* );
        },
      )} */}
    </div>
  );
};
