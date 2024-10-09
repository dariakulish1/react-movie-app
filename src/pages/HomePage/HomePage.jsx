import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDebounce } from 'use-debounce';
import './HomePage.scss';
import { MovieList } from '../../components/MovieList';
import { Spinner } from '../../components/Spinner';
import { getRequest } from '../../utils/url';
import { TrackVisible } from '../../components/TrackVisible/TrackVisible';
import { LangBtn } from '../../components/LangBtns';

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
  const [debouncedText] = useDebounce(inputText, 1000);

  const notFound = inputText.length > 0 && findMovie.length === 0;

  const fetchMovies = useCallback(
    (pageNum) => {
      if (pageNum > data.total_pages) {
        setIsFetching(false);
        return;
      }
      setIsFetching(true);
      getRequest('movie/popular?', 'bg', pageNum)
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
    },
    [data.total_pages],
  );

  const { t } = useTranslation();

  useEffect(() => {
    fetchMovies(page);
  }, [fetchMovies, page]);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setInputText(value);
    if (value) {
      setFound(true);
    } else {
      setFound(false);
    }
  };

  useEffect(() => {
    if (debouncedText) {
      handleMovieChange(debouncedText);
    }
  }, [debouncedText]);

  const handleMovieChange = (inputText) => {
    getRequest(`search/movie?query=${inputText}&include_adult=false&`, 'bg', 1)
      .then((response) => {
        setFindMovie(response.results);
      })
      .catch(() => {
        setError(true);
      });
  };

  const loadMoreMovies = () => {
    if (!isFetching && page < data.total_pages) {
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
  if (data.total_pages < page) return console.log('PageLimit');
  return (
    <section className="films-list container">
      <LangBtn />
      <div className="films-list__search-bar">
        <input
          className="films-list__input"
          type="text"
          placeholder={t('main.input')}
          value={inputText}
          onChange={handleInputChange}
        />
        <p>Actual value: {inputText}</p>
        <p>Debounced value: {debouncedText}</p>
      </div>

      {notFound ? (
        <div className="container">{t('main.notFound')}</div>
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
