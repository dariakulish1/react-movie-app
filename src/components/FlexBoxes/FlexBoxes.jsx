import { Link } from 'react-router-dom';
import { useState } from 'react';
import PropTypes from 'prop-types';
import './FlexBoxes.scss';
import { savedBounding } from '../../images/savedBounding';
import solidStar from '../../images/star-solid.svg';

const propTypes = {
  genres: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  ).isRequired,
  movieId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  original_title: PropTypes.string.isRequired,
  vote_average: PropTypes.number.isRequired,
  poster_path: PropTypes.string.isRequired,
  genresIds: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export const FlexBoxes = ({
  genres,
  genresIds,
  title,
  movieId,
  original_title: originalTitle,
  vote_average: voteAverage,
  poster_path: posterPath,
}) => {
  const allGenres = genresIds
    .map((genreId) => {
      const genre = genres.find((g) => g.id === genreId);
      return genre.name;
    })
    .slice(0, 3)
    .join(' • ');

  const [fillColor, setButtonColor] = useState('white');
  const handleButtonClick = () => {
    setButtonColor(savedBounding(fillColor === 'white'));
    const savedMovie = JSON.stringify(movieId);
    localStorage.setItem('savedMovie', savedMovie);
    const savedMoviesArr = savedMovie.push(movieId);
    console.log('savedMovie', savedMovie);
    console.log('savedMoviesArr', savedMoviesArr);
  };
  return (
    <div className="flex-box">
      <Link to={`/movie/${movieId}`}>
        <img
          className="flex-box__server-img"
          src={`https://image.tmdb.org/t/p/w185/${posterPath}`}
          alt=""
        />
      </Link>
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
        <button
          className="flex-box__saved-movie"
          type="button"
          onClick={handleButtonClick}
        >
          {savedBounding(fillColor)}
        </button>
      </div>
      <Link className="flex-box" to={`/movie/${movieId}`}>
        <div className="flex-box__movie-titles">
          <p className="flex-box__main-title inter">{title}</p>
          <p className="flex-box__original-title inter">{originalTitle}</p>
          <p className="flex-box__movie-genres inter">{allGenres}</p>
          <div className="flex-box__age-limit">18+</div>
          <div className="flex-box__quality">Full HD</div>
          <div className="flex-box__rate-num">{`IMDb ${voteAverage.toFixed(1)}`}</div>
        </div>
      </Link>
    </div>
  );
};

FlexBoxes.propTypes = propTypes;
