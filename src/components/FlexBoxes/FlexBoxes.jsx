import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './FlexBoxes.scss';
import bounding from '../../images/bounding-24.svg';
import solidStar from '../../images/star-solid.svg';

const propTypes = {
  movieid: PropTypes.number.isRequired,
  activebounding: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  original_title: PropTypes.string.isRequired,
  vote_average: PropTypes.number.isRequired,
  poster_path: PropTypes.node.isRequired,
};
export const FlexBoxes = ({
  title,
  activebounding,
  movieid,
  original_title: originalTitle,
  vote_average: voteAverage,
  poster_path: posterPath,
}) => {
  return (
    <Link className="flex-box" to={`/movie/${movieid}`}>
      <img
        className="flex-box__server-img"
        src={`https://image.tmdb.org/t/p/w185/${posterPath}`}
        alt=""
      />
      <div className="flex-box__bottom-panel">
        <div className="flex-box__rating-box">
          <p className="flex-box__rating-num inter">
            <img
              className="flex-box__solid-star"
              src={solidStar}
              alt="solid-star"
            />
            {voteAverage.toFixed(1)}
          </p>
        </div>
        <div className="flex-box__saved-movie">
          {activebounding || (
            <img
              className="flex-box__bounding cursor"
              src={bounding}
              alt="bounding"
            />
          )}
        </div>
      </div>
      <div className="flex-box__movie-titles">
        <p className="flex-box__main-title inter">{title}</p>
        <p className="flex-box__original-title inter">{originalTitle}</p>
        <p className="flex-box__movie-genres inter">Genre 1</p>
        <div className="flex-box__age-limit">18+</div>
        <div className="flex-box__quality">Full HD</div>
        <div className="flex-box__rate-num">{`IMDb ${voteAverage.toFixed(1)}`}</div>
      </div>
    </Link>
  );
};

FlexBoxes.propTypes = propTypes;
