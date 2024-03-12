import PropTypes from 'prop-types';
import './MovieList.scss';
import { FlexBoxes } from '../FlexBoxes';

const propTypes = {
  activebounding: PropTypes.shape.isRequired,
  results: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
};
export const MovieList = ({ activebounding, results }) => {
  return (
    <div className="div-list container">
      <FlexBoxes activebounding={activebounding} id={results?.id} />
      <FlexBoxes activebounding={activebounding} id={2} />
      <FlexBoxes activebounding={activebounding} id={3} />
      <FlexBoxes activebounding={activebounding} id={4} />
      <FlexBoxes activebounding={activebounding} id={5} />
      <FlexBoxes activebounding={activebounding} id={6} />
    </div>
  );
};

MovieList.propTypes = propTypes;
