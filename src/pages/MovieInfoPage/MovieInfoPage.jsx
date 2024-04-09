import PropTypes from 'prop-types';
import { RevolvingDot } from 'react-loader-spinner';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './MovieInfoPage.scss';
import serverImg from '../../images/posterimg.jpg';
import trailer1 from '../../images/trailer1.png';
import trailer2 from '../../images/trailer2.png';
import { CastBox } from '../../components/CastBox';
import { headers } from '../../utils/headers';

const propTypes = {
  // movieid: PropTypes.number.isRequired,
};
export const MovieInfoPage = () => {
  const { movieid } = useParams();
  const [data, setData] = useState({});
  const promise = fetch(`movie/${movieid}`);
  const [iserror, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        headers,
      },
    };

    fetch(`https://api.themoviedb.org/3/movie/${movieid}?language=en-US`, {
      headers,
    })
      .then((response) => response.json())
      .then((data) => setData(data))
      .then((response) => console.log('resp:', response))
      .catch((err) => console.error(err));
  }, [movieid]);
  promise
    .then((response) => {
      if (!response.ok) {
        return Promise.reject(Error('Error'));
      }
      return response.json();
    })
    .then((data) => {
      setLoading(false);
      setData(data.results);
    })
    .catch((err) => {
      setError(false);
      console.error(err);
    });
  if (loading) {
    return (
      <div>
        <RevolvingDot
          visible
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="revolving-dot-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
        This page is loading...
      </div>
    );
  }
  if (iserror) {
    return <div>Sorry, it is error</div>;
  }
  return (
    <div className="info-box container">
      <div className="info-box__back-case">
        <Link
          className="info-box__back-botton"
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
        <div className="info-box__detailed-info">
          <p className="info-box__server-movie-name">{data.title}</p>
          <p className="info-box__small-title">{data.original_title}</p>
          <p className="info-box__server-movie-rating">
            Rating:{' '}
            <span className="info-box__span-num">
              {data.vote_average ? data.vote_average.toFixed(1) : 0}
            </span>
          </p>
          <p className="info-box__server-data-release">
            Release data:
            <span className="info-box__span-data">{data.release_date}</span>
          </p>
          <p className="info-box__server-genres-info">
            Genre:
            <span className="info-box__span-genres">
              Genre 1, genre 2, genre 3
            </span>
          </p>
          <p className="info-box__server-runtime-info">
            Runtime:
            <span className="info-box__span-runtime">
              {data.runtime} minutes
            </span>
          </p>
          <div className="info-box__buttons-box">
            <hr />
            <div className="info-box__two-buttons-container">
              <button type="button" className="info-box__button-to-watch">
                &#9658; Watch movie
              </button>
              <button type="button" className="info-box__button-to-add-to-fav">
                Add to favorite
              </button>
            </div>
          </div>
          <div className="info-box__film-description">
            <hr />
            <p className="info-box__description-text">{data.overview}</p>
          </div>
        </div>
      </div>
      <hr />
      <p className="info-box__trailers-title">Trailers</p>
      <div className="info-box__trailer-video">
        <div className="info-box__video-with-title">
          <img
            className="info-box__server-trailer-video"
            src={trailer1}
            alt="trailer-1"
          />
          <p className="info-box__official-trailer-title">Official trailer 1</p>
        </div>
        <div className="info-box__video-with-title">
          <img
            className="info-box__server-trailer-video"
            src={trailer2}
            alt="trailer-2"
          />
          <p className="info-box__official-trailer-title">Official trailer 2</p>
        </div>
      </div>
      <hr />
      <p className="info-box__cast-title">Cast</p>
      <div className="info-box__cast-case">
        <CastBox />
      </div>
    </div>
  );
};

MovieInfoPage.propTypes = propTypes;
