import PropTypes from 'prop-types';
import './MovieList.scss';
import { FlexBoxes } from '../FlexBoxes';

const propTypes = {
  activebounding: PropTypes.element.isRequired,
  movies: PropTypes.element.isRequired,
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
        ({
          id,
          title,
          original_title: originalTitle,
          vote_average: voteAverage,
          poster_path: posterPath,
        }) => {
          return (
            <FlexBoxes
              title={title}
              activebounding={activebounding}
              movieid={id}
              original_title={originalTitle}
              vote_average={voteAverage}
              poster_path={posterPath}
            />
          );
        },
      )}
    </div>
  );
};

MovieList.propTypes = propTypes;
