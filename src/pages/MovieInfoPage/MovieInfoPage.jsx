import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './MovieInfoPage.scss';
import trailer1 from '../../images/trailer1.png';
import trailer2 from '../../images/trailer2.png';
import { CastBox } from '../../components/CastBox';
import { headers } from '../../utils/headers';
import { Spinner } from '../../components/Spinner';
import { getUrl } from '../../utils/url';

const propTypes = {
  elements: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string.isRequired,
    original_title: PropTypes.string.isRequired,
    vote_average: PropTypes.number.isRequired,
    poster_path: PropTypes.node.isRequired,
  }).isRequired,
};
export const MovieInfoPage = () => {
  const { movieid } = useParams();
  const [data, setData] = useState({});
  const [isError, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  useEffect(() => {
    const options = {
      method: 'GET',
      headers,
    };
    fetch(getUrl(`movie/${movieid}?`), options)
      .then((response) => {
        if (!response.ok) {
          return Promise.reject(Error('Error'));
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .then((response) => response)
      .catch((err) => {
        setError(true);
      });
  }, [movieid]);

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
            <span className="info-box__span-genres">Genres</span>
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
          <img
            className="info-box__server-trailer-video cursor"
            src={trailer1}
            alt="trailer-1"
          />
          <p className="info-box__official-trailer-title">Official trailer 1</p>
        </div>
        <div className="info-box__video-with-title">
          <img
            className="info-box__server-trailer-video cursor"
            src={trailer2}
            alt="trailer-2"
          />
          <p className="info-box__official-trailer-title inter">
            Official trailer 2
          </p>
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
