import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './MovieList.scss';
import { FlexBoxes } from '../FlexBoxes';
import { headers } from '../../utils/headers';

const propTypes = {
  activebounding: PropTypes.shape.isRequired,
  elements: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    original_title: PropTypes.string.isRequired,
    vote_average: PropTypes.number.isRequired,
    poster_path: PropTypes.shape.isRequired,
  }).isRequired,
};
export const MovieList = ({ activebounding }) => {
  const { movieid } = useParams();
  const [data, setData] = useState([]);
  useEffect(() => {
    const options = {
      method: 'GET',
      headers,
    };
    fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', {
      options,
      headers,
    })
      .then((response) => response.json())
      .then((data) => setData(data.results))
      .catch((err) => console.error(err));
  }, []);
  return (
    <div className="div-list container">
      {data.map(({ id, title, original_title, vote_average, poster_path }) => {
        return (
          <FlexBoxes
            title={title}
            activebounding={activebounding}
            movieid={id}
            original_title={original_title}
            vote_average={vote_average}
            poster_path={poster_path}
          />
        );
      })}
    </div>
  );
};

MovieList.propTypes = propTypes;
