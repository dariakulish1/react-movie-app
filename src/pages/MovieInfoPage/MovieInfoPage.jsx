import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import './MovieInfoPage.scss';
import { CastBox } from '../../components/CastBox';
import { Spinner } from '../../components/Spinner';
import { getRequest } from '../../utils/url';
import { getMovieInfo } from '../../services/getMovieInfo';

const propTypes = {
  genres: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  ).isRequired,
};
export const MovieInfoPage = ({ genres }) => {
  const { movieId } = useParams();
  const [videos, setVideos] = useState([]);
  const [data, setData] = useState({});
  const [isError, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  // чи є movieId в localStorage
  const getFoo = useCallback(() => {
    const favMovies = localStorage.getItem('savedMovies') ?? '[]';
    const favMoviesArr = JSON.parse(favMovies);
    const movieId2 = parseInt(movieId, 10);
    const bool = favMoviesArr.includes(movieId2);
    if (bool === true) {
      return true;
    }
    return false;
  }, [movieId]);

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
    getRequest(`movie/${movieId}/videos?`)
      .then((videos) => {
        setVideos(videos.results);
      })
      .catch((err) => {});
  }, [movieId]);

  const [favMovieText, setText] = useState('');
  useEffect(() => {
    const isAdded = getFoo(); // movie added in localStorage

    if (isAdded === true) {
      const updatedText = 'Remove from favorite';
      setText(updatedText);
    } else {
      const updatedText = 'Add to favorite';
      setText(updatedText);
    }
    // setText(updatedText);
  }, [getFoo]);

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
  const allGenres = data.genres
    .map(({ name }) => {
      return name;
    })
    .join(', ');

  const {
    posterPath,
    title,
    originalTitle,
    voteAverage,
    releaseDate,
    runtime,
    overview,
  } = data;

  const handleButtonClick = () => {
    const isRemoved = getFoo();
    if (isRemoved === false) {
      const updatedText = 'Remove from favorite';
      setText(updatedText);
    } else {
      const updatedText = 'Add to favorite';
      setText(updatedText);
    }
    const favMovies = localStorage.getItem('savedMovies') ?? '[]';
    const favMoviesNum = JSON.parse(favMovies);
    const movieId2 = parseInt(movieId, 10);
    const movieIdIndex = favMoviesNum.indexOf(movieId2);
    if (movieIdIndex === -1) {
      favMoviesNum.push(movieId2);
    } else {
      favMoviesNum.splice(movieIdIndex, 1);
    }
    const favMoviesStr = JSON.stringify(favMoviesNum);
    localStorage.setItem('savedMovies', favMoviesStr);
    const updatedText =
      favMovies.indexOf(movieId2) !== -1
        ? 'Add to favorite'
        : 'Remove from favorite';
    setText(updatedText);
  };

  return (
    <div className="info-box container">
      <div className="info-box__back-case">
        <Link
          className="info-box__back-botton inter"
          to="#"
          onClick={() => window.history.back()}
        >
          &#60; Back
        </Link>
      </div>
      <div className="info-box__general-info">
        <div className="info-box__film-poster-box">
          <img
            className="info-box__film-poster"
            src={`https://image.tmdb.org/t/p/w185/${posterPath}`}
            alt="serverImage"
          />
        </div>
        <div className="info-box__detailed-info inter">
          <p className="info-box__server-movie-name inter">{title}</p>
          <p className="info-box__small-title inter">{originalTitle}</p>
          <p className="info-box__server-movie-rating inter">
            Rating:{' '}
            <span className="info-box__span-num">
              {voteAverage ? voteAverage.toFixed(1) : 0}
            </span>
          </p>
          <p className="info-box__server-data-release inter">
            Release data:
            <span className="info-box__span-data">{releaseDate}</span>
          </p>
          <p className="info-box__server-genres-info inter">
            Genre:
            <span className="info-box__span-genres">{allGenres}</span>
          </p>
          <p className="info-box__server-runtime-info inter">
            Runtime:
            <span className="info-box__span-runtime">{runtime} minutes</span>
          </p>
          <div className="info-box__buttons-box">
            <hr />
            <div className="info-box__two-buttons-container">
              <button
                type="button"
                className="info-box__button-to-watch cursor inter"
              >
                &#9658; Watch movie
              </button>
              <button
                onClick={handleButtonClick}
                type="button"
                className="info-box__button-to-add-to-fav cursor inter"
              >
                {favMovieText}
              </button>
            </div>
          </div>
          <div className="info-box__film-description inter">
            <hr />
            <p className="info-box__description-text">{overview}</p>
          </div>
        </div>
      </div>
      <hr />
      <p className="info-box__trailers-title inter">Trailers</p>
      <div className="info-box__trailer-video">
        <div className="info-box__video-with-title">
          {videos
            .map(({ key, site }) => {
              if (site === 'YouTube') {
                return (
                  <iframe
                    key={key}
                    className="info-box__server-trailer-video cursor"
                    src={`https://www.youtube.com/embed/${key}`}
                    title="Official trailer 1"
                    allowFullScreen
                  />
                );
              }
              return (
                <p className="info-box__not-found-video">Video is not found</p>
              );
            })
            .slice(0, 3)}
        </div>
      </div>
      <hr />
      <p className="info-box__cast-title inter">Cast</p>
      <div className="info-box__cast-case">
        <CastBox />
      </div>
    </div>
  );
};

MovieInfoPage.propTypes = propTypes;
