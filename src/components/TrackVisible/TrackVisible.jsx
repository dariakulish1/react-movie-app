import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';
import { getRequest } from '../../utils/url';
import { MovieList } from '../MovieList';
import './TrackVisible.scss';

export const TrackVisible = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [data, setData] = useState([]);
  const [isError, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('TrackVisible inView:', inView);
    if (inView) {
      const pages = [];
      for (let i = 2; i < 12; i += 1) {
        pages.push(i);
      }
      Promise.all(
        pages.map((pagesNum) => getRequest('movie/popular?', pagesNum)),
      )
        .then((responses) => {
          const dataPages = pages.map((response) => response.results);
          setData(dataPages);
          setLoading(false);
        })
        .catch(() => {
          setError(true);
          setLoading(false);
        });
    }
  }, [inView]);

  if (loading) return <p>Loading...</p>;
  if (isError) return <p>Error loading data</p>;
  return (
    <div className="in-view-page container" ref={ref}>
      <div>
        {inView ? <MovieList movies={data} /> : <p>Loading movies...</p>}
      </div>
    </div>
  );
};
