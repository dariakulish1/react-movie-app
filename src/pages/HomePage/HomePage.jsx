import PropTypes from 'prop-types';
import './HomePage.scss';
import { MovieList } from '../../components/MovieList';

const propTypes = {
  id: PropTypes.number.isRequired,
};

export const HomePage = ({ id }) => {
  return (
    <section className="films-list container">
      <input
        className="films-list__input"
        type="text"
        placeholder="Write film name..."
      />
      <MovieList id={id} />
    </section>
  );
};

HomePage.propTypes = propTypes;
