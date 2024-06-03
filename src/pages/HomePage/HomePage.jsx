import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import './HomePage.scss';
import { MovieList } from '../../components/MovieList';
import { headers } from '../../utils/headers';
import { Spinner } from '../../components/Spinner';
import { getUrl } from '../../utils/url';

const propTypes = {
  id: PropTypes.number.isRequired,
  genres: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  ).isRequired,
  elements: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string.isRequired,
    original_title: PropTypes.string.isRequired,
    vote_average: PropTypes.number.isRequired,
    poster_path: PropTypes.node.isRequired,
  }).isRequired,
};

export const HomePage = ({ id, genres }) => {
  const [data, setData] = useState([]);
  const [findMovie, setFindMovie] = useState([]);
  const [isFound, setFound] = useState(false);
  const [isError, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [inputText, setInputText] = useState('');

  const notFound = inputText.length > 0 && findMovie.length === 0;

  const handleInputChange = (event) => {
    const { value } = event.target;
    if (value) {
      setFound(true);
      handleMovieChange(value);
    } else {
      setFound(false);
    }
    setInputText(value);
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
    const promise = fetch(getUrl('movie/popular?'), {
      headers,
      options,
    });
    promise
      .then((response) => {
        if (!response.ok) {
          return Promise.reject(Error('Error'));
        }
        return response.json();
      })
      .then((data) => {
        setData(data.results);
        setLoading(false);
        console.log('genres home ', genres);
      })
      .then((response) => response)
      .catch((err) => {
        setError(true);
      });
  }, [genres]);

  const handleMovieChange = (inputText) => {
    const options = {
      method: 'GET',
      headers,
    };
    fetch(
      getUrl(`search/movie?query=${inputText}&include_adult=false&`),
      options,
    )
      .then((response) => response.json())
      .then((response) => {
        setFindMovie(response.results);
      })
      .catch((err) => {});
  };

  if (loading) {
    return (
      <div>
        <Spinner />
        This page is loading...
      </div>
    );
  }

  if (isError) {
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
      </div>

      {notFound ? (
        <div className="container">Movie is not found</div>
      ) : (
        <MovieList movies={isFound ? findMovie : data} genres={genres} />
      )}
    </section>
  );
};

HomePage.propTypes = propTypes;
