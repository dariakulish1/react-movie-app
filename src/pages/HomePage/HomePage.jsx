import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import './HomePage.scss';
import { MovieList } from '../../components/MovieList';

const propTypes = {
  id: PropTypes.number.isRequired,
  elements: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    original_title: PropTypes.string.isRequired,
    vote_average: PropTypes.number.isRequired,
    poster_path: PropTypes.shape.isRequired,
  }).isRequired,
};

export const HomePage = ({ id }) => {
  const promise = fetch(`movie/${id}`);
  const [data, setData] = useState([]);
  const [error, setError] = useState([]);

  promise
    .then((response) => {
      if (response.ok || response.status === 200) {
        return response.json();
      }
      setError(true);
      response.json();
      return Promise.reject(Error('Error'));
    })
    .then((data) => setData(data.results))
    .catch((err) => console.error(err));
  if (error) {
    return <div>Sorry, it is error</div>;
  }
  return (
    <section className="films-list container">
      <input
        className="films-list__input"
        type="text"
        placeholder="Write film name..."
      />
      <MovieList id={id} />
    </section>
  );
};

HomePage.propTypes = propTypes;
