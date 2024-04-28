import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import './HomePage.scss';
import { MovieList } from '../../components/MovieList';
import { headers } from '../../utils/headers';
import { Spinner } from '../../components/Spinner/Spinner';

const propTypes = {
  id: PropTypes.number.isRequired,
  // onFindClick: PropTypes.function.isRequired,
  elements: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string.isRequired,
    original_title: PropTypes.string.isRequired,
    vote_average: PropTypes.number.isRequired,
    poster_path: PropTypes.shape.isRequired,
  }).isRequired,
};

export const HomePage = ({ id }) => {
  const [data, setData] = useState([]);
  const [iserror, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [inputText, setInputText] = useState('');
  const [movie, setMovie] = useState('');

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

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
    const promise = fetch(
      'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',
      {
        headers,
        options,
      },
    );
    promise
      .then((response) => {
        if (!response.ok) {
          return Promise.reject(Error('Error'));
        }
        return response.json();
      })
      .then((data) => setData(data))
      .then((response) => response)
      .catch((err) => {
        setError(true);
      });
  }, [data]);

  const handleMovieChange = (newMovie) => {
    setMovie(newMovie);
    const options = {
      method: 'GET',
      headers,
    };
    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${newMovie}&include_adult=false&language=en-US&page=1`,
      options,
    )
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  };

  const handleFindClick = () => {
    handleMovieChange(inputText);
  };

  if (loading) {
    return (
      <div>
        <Spinner />
        This page is loading...
      </div>
    );
  }
  if (iserror) {
    return <div>Sorry, it is error</div>;
  }
  return (
    <section className="films-list container">
      <div className="films-list__search-bar">
        <input
          className="films-list__input"
          type="text"
          placeholder="Write film name..."
          value={inputText}
          onChange={handleInputChange}
        />
        <button
          className="films-list__find_btn"
          type="button"
          onClick={handleFindClick}
        >
          Find
        </button>
      </div>

      <MovieList />
    </section>
  );
};

HomePage.propTypes = propTypes;
