import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './MovieList.scss';
import { FlexBoxes } from '../FlexBoxes';

const propTypes = {
  activebounding: PropTypes.shape.isRequired,
  results: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
};
export const MovieList = ({ activebounding, results }) => {
  const { movieid } = useParams();
  console.log('movieid: ', movieid);
  const [data, setData] = useState([]);
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
  return (
    <div className="div-list container">
      {data.map(() => (
        <FlexBoxes activebounding={activebounding} movieid={results?.id} />
      ))}
    </div>
  );
};

MovieList.propTypes = propTypes;
