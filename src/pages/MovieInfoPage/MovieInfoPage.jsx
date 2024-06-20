import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './MovieInfoPage.scss';
import { CastBox } from '../../components/CastBox';
import { Spinner } from '../../components/Spinner';
import { getUrl } from '../../utils/url';

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

  useEffect(() => {
    getUrl(`movie/${movieId}?`)
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .then((response) => response)
      .catch((err) => {
        setError(true);
        setLoading(false);
      });
    getUrl(`movie/${movieId}/videos?`)
      .then((videos) => {
        setVideos(videos.results);
      })
      .catch((err) => {});
  }, [movieId]);

  if (loading) {
    return (
      <div>
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
            src={`https://image.tmdb.org/t/p/w185/${data.poster_path}`}
            alt="serverImage"
          />
        </div>
        <div className="info-box__detailed-info inter">
          <p className="info-box__server-movie-name inter">{data.title}</p>
          <p className="info-box__small-title inter">{data.original_title}</p>
          <p className="info-box__server-movie-rating inter">
            Rating:{' '}
            <span className="info-box__span-num">
              {data.vote_average ? data.vote_average.toFixed(1) : 0}
            </span>
          </p>
          <p className="info-box__server-data-release inter">
            Release data:
            <span className="info-box__span-data">{data.release_date}</span>
          </p>
          <p className="info-box__server-genres-info inter">
            Genre:
            <span className="info-box__span-genres">{allGenres}</span>
          </p>
          <p className="info-box__server-runtime-info inter">
            Runtime:
            <span className="info-box__span-runtime">
              {data.runtime} minutes
            </span>
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
                type="button"
                className="info-box__button-to-add-to-fav cursor inter"
              >
                Add to favorite
              </button>
            </div>
          </div>
          <div className="info-box__film-description inter">
            <hr />
            <p className="info-box__description-text">{data.overview}</p>
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
              if (site !== 'YouTube') {
                return (
                  <p className="info-box__not-found-video">
                    Video is not found
                  </p>
                );
              }
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
