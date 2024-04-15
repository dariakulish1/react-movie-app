import { ColorRing } from 'react-loader-spinner';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import './HomePage.scss';
import { MovieList } from '../../components/MovieList';
import { headers } from '../../utils/headers';

const propTypes = {
  id: PropTypes.number.isRequired,
  elements: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string.isRequired,
    original_title: PropTypes.string.isRequired,
    vote_average: PropTypes.number.isRequired,
    poster_path: PropTypes.shape.isRequired,
  }).isRequired,
};

export const HomePage = ({ id }) => {
  const promise = fetch(`movie/${id}`);
  const [data, setData] = useState([]);
  const [iserror, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  useEffect(() => {
    const options = {
      method: 'GET',
      headers,
    };
    fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', {
      headers,
      options,
    })
      .then((response) => {
        if (!response.ok) {
          return Promise.reject(Error('Error'));
        }
        return response.json();
      })
      .then((data) => setData(data))
      .then((response) => console.log('resp:', response))
      .catch((err) => {
        setError(true);
        console.error(err);
      });
  }, []);
  promise
    .then((response) => {
      if (!response.ok) {
        return Promise.reject(Error('Error'));
      }
      return response.json();
    })
    .then((data) => {
      setLoading(false);
      setData(data);
    })
    .catch((err) => {
      setError(false);
      console.error(err);
    });
  if (loading) {
    return (
      <div>
        <ColorRing
          className="container"
          visible
          height="80"
          width="80"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        />
        This page is loading...
      </div>
    );
  }
  if (iserror) {
    return <div>Sorry, it is error</div>;
  }
  return (
    <section className="films-list container">
      <input
        className="films-list__input"
        type="text"
        placeholder="Write film name..."
      />
      <MovieList />
    </section>
  );
};

HomePage.propTypes = propTypes;
