import { Link } from 'react-router-dom';
import { useState } from 'react';
import PropTypes from 'prop-types';
import './FlexBoxes.scss';
import { SavedBounding } from '../../images/SavedBounding';
import solidStar from '../../images/star-solid.svg';

const propTypes = {
  movieId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  originalTitle: PropTypes.string.isRequired,
  voteAverage: PropTypes.number.isRequired,
  posterPath: PropTypes.string.isRequired,
  allGenres: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export const FlexBoxes = ({
  allGenres,
  title,
  movieId,
  originalTitle,
  voteAverage,
  posterPath,
}) => {
  // const allGenres = genresIds
  //   .map((genreId) => {
  //     const genre = genres.find((g) => g.id === genreId);
  //     return genre.name;
  //   })
  //   .slice(0, 3)
  //   .join(' • ');

  const [fillColor, setButtonColor] = useState('none');
  const handleButtonClick = () => {
    setButtonColor((fillColor) => (fillColor === 'none' ? 'white' : 'none'));

    const savedMovies = localStorage.getItem('savedMovies') ?? '[]';
    const savedMoviesNum = JSON.parse(savedMovies);

    const movieIdIndex = savedMoviesNum.indexOf(movieId);
    if (movieIdIndex === -1) {
      savedMoviesNum.push(movieId);
    } else {
      savedMoviesNum.splice(movieIdIndex, 1);
    }

    const savedMoviesStr = JSON.stringify(savedMoviesNum);
    localStorage.setItem('savedMovies', savedMoviesStr);
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
          aria-label="fav"
          onClick={handleButtonClick}
        >
          <SavedBounding fillColor={fillColor} />
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
