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
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YzJjNDU3N2FiNWY1MDAwMWRlNTBlMmQzYWVlMDgxMyIsInN1YiI6IjY1ZDQ2OGZiMDlkZGE0MDE4ODU4MDYzNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qg910gKgtA4qwRkHbQFWbYQLbpPR5H7vR9sO3rtqkMM',
      },
    };
    fetch(
      'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',
      options,
    )
      .then((response) => response.json())
      .then((data) => setData(data.results))
      .catch((err) => console.error(err));
  }, []);
  promise
    .then((response) => {
      if (response.ok || response.status === 200) {
        return response.json();
      }
      setError(true);
      setLoading(false);
      response.json();
      return Promise.reject(Error('Error'));
    })
    .then((data) => {
      setData(data.results);
      setLoading(false);
    })
    .catch((err) => console.error(err));
  if (error) {
    return <div>Sorry, it is error</div>;
  }
  if (loading) {
    return <div>This page is loading...</div>;
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
