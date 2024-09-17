import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import './HomePage.scss';
import { MovieList } from '../../components/MovieList';
import { Spinner } from '../../components/Spinner';
import { getRequest } from '../../utils/url';
import { TrackVisible } from '../../components/TrackVisible/TrackVisible';

const propTypes = {
  genLoading: PropTypes.bool.isRequired,
};

export const HomePage = ({ genLoading }) => {
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
    getRequest('movie/popular?', 1)
      .then((data) => {
        setData(data.results);
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
      });
  }, []);

  const handleMovieChange = (inputText) => {
    getRequest(`search/movie?query=${inputText}&include_adult=false&`, 1)
      .then((response) => {
        setFindMovie(response.results);
      })
      .catch((err) => {});
  };

  if (loading || genLoading) {
    return (
      <div className="spinner container">
        <Spinner />
        This page is loading...
      </div>
    );
  }

  if (isError) {
    return <div className="container">Sorry, it is error</div>;
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
        <>
          <MovieList movies={isFound ? findMovie : data} />
          <div className="in-view-home">
            <TrackVisible />
          </div>
        </>
      )}
    </section>
  );
};

HomePage.propTypes = propTypes;
