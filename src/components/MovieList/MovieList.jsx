import PropTypes from 'prop-types';
import './MovieList.scss';
import { FlexBoxes } from '../FlexBoxes';

const propTypes = {
  activebounding: PropTypes.shape.isRequired,
  movies: PropTypes.shape.isRequired,
  elements: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    original_title: PropTypes.string.isRequired,
    vote_average: PropTypes.number.isRequired,
    poster_path: PropTypes.shape.isRequired,
  }).isRequired,
};
export const MovieList = ({ activebounding, movies }) => {
  return (
    <div className="div-list container">
      {movies.map(
        ({ id, title, original_title, vote_average, poster_path }) => {
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
        },
      )}
    </div>
  );
};

MovieList.propTypes = propTypes;
