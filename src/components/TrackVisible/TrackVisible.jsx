import PropTypes from 'prop-types';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import './TrackVisible.scss';

const propTypes = {
  loadMoreMovies: PropTypes.func.isRequired,
};

export const TrackVisible = ({ loadMoreMovies }) => {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      loadMoreMovies();
    }
  }, [inView, loadMoreMovies]);

  return <div ref={ref} className="in-view-page container" />;
};

TrackVisible.propTypes = propTypes;
