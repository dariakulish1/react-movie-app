import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import debounce from 'debounce';
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
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);

  const notFound = inputText.length > 0 && findMovie.length === 0;

  const fetchMovies = useCallback((pageNum) => {
    setIsFetching(true);
    getRequest('movie/popular?', pageNum)
      .then((data) => {
        setData((prevData) => [...prevData, ...data.results]);
        setLoading(false);
        setIsFetching(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
        setIsFetching(false);
      });
  }, []);

  useEffect(() => {
    fetchMovies(page);
  }, [fetchMovies, page]);

  const handleInputChange = (event) => {
    const { value } = event.target;
    if (value) {
      setFound(true);
      handleMovieChange(value);
    } else {
      setFound(false);
    }
    setInputText(value);
    console.log('input: ', value);
  };

  const debouncedHandleInputChange = debounce(handleInputChange, 200).trigger();

  const handleMovieChange = (inputText) => {
    getRequest(`search/movie?query=${inputText}&include_adult=false&`, 1)
      .then((response) => {
        setFindMovie(response.results);
      })
      .catch(() => {
        setError(true);
      });
  };

  const loadMoreMovies = () => {
    if (!isFetching) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      sessionStorage.setItem('scrollPosition', currentScroll);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (loading || genLoading) {
    return (
      <div className="spinner container">
        <Spinner />
        This page is loading...
      </div>
    );
  }

  if (isError) {
    return <div className="container">Sorry, an error occurred</div>;
  }

  return (
    <section className="films-list container">
      <div className="films-list__search-bar">
        <input
          className="films-list__input"
          type="text"
          placeholder="Write film name..."
          value={inputText}
          // onChange={handleInputChange}
          onChange={debouncedHandleInputChange}
        />
      </div>

      {notFound ? (
        <div className="container">Movie not found</div>
      ) : (
        <>
          <MovieList movies={isFound ? findMovie : data} />
          <TrackVisible loadMoreMovies={loadMoreMovies} />
          {isFetching && (
            <div className="spinner container">
              <Spinner />
              This page is loading...
            </div>
          )}
        </>
      )}
    </section>
  );
};

HomePage.propTypes = propTypes;
