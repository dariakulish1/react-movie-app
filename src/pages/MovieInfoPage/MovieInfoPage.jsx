import { Link, useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import './MovieInfoPage.scss';
import { toast } from 'react-toastify';
import { CastBox } from '../../components/CastBox';
import { Spinner } from '../../components/Spinner';
import { getRequest } from '../../utils/url';
import { getMovieInfo } from '../../services/getMovieInfo';

export const MovieInfoPage = () => {
  const { movieId } = useParams();
  const [videos, setVideos] = useState([]);
  const [data, setData] = useState({});
  const [isError, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const movieIdNum = parseInt(movieId, 10);

  const getParsedArr = () => {
    const favMovies = localStorage.getItem('savedMovies') ?? '[]';
    const favMoviesArr = JSON.parse(favMovies);
    return favMoviesArr;
  };

  const checkMovieId = useCallback(() => {
    const parsedArr = getParsedArr();
    const bool = parsedArr.includes(movieIdNum);
    return bool;
  }, [movieIdNum]);

  const [favMovieText, setText] = useState('');
  const setBtnText = useCallback((addOrRemove) => {
    if (addOrRemove) {
      const updatedText = 'Remove from favorite';
      setText(updatedText);
    } else {
      const updatedText = 'Add to favorite';
      setText(updatedText);
    }
  }, []);

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
    getRequest(`movie/${movieId}/videos?`, 1)
      .then((videos) => {
        setVideos(videos.results);
      })
      .catch((err) => {});
  }, [movieId]);

  useEffect(() => {
    const isAdded = checkMovieId();
    setBtnText(isAdded);
  }, [checkMovieId, setBtnText]);

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
    const isAdded = checkMovieId();
    setBtnText(!isAdded);
    const parsedArr = getParsedArr();
    const movieIdIndex = parsedArr.indexOf(movieIdNum);
    let notifyMessage = '';
    if (!isAdded) {
      parsedArr.push(movieIdNum);
      notifyMessage = `${title} added successfully`;
    } else {
      parsedArr.splice(movieIdIndex, 1);
      notifyMessage = `${title} has been removed`;
    }
    const favMoviesStr = JSON.stringify(parsedArr);
    localStorage.setItem('savedMovies', favMoviesStr);
    toast(notifyMessage);
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
