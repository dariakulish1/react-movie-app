import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import './HomePage.scss';
import { MovieList } from '../../components/MovieList';
import { headers } from '../../utils/headers';
import { Spinner } from '../../components/Spinner';
import { getUrl } from '../../utils/url';

const propTypes = {
  genres: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  ).isRequired,
  genLoading: PropTypes.bool.isRequired,
  data: PropTypes.shape({
    results: PropTypes.shape({
      title: PropTypes.string,
      original_title: PropTypes.string,
      vote_average: PropTypes.number,
      poster_path: PropTypes.string,
    }),
  }).isRequired,
};

export const HomePage = ({ genres, genLoading }) => {
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
        console.log(data);
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

  if (loading || genLoading) {
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
