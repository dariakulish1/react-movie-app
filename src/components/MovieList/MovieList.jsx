import PropTypes from 'prop-types';
import './MovieList.scss';
import { FlexBoxes } from '../FlexBoxes';

const propTypes = {
  activebounding: PropTypes.shape.isRequired,
};
export const MovieList = ({ activebounding }) => {
  return (
    <div className="div-list container">
      <FlexBoxes activebounding={activebounding} id={1} />
      <FlexBoxes activebounding={activebounding} id={2} />
      <FlexBoxes activebounding={activebounding} id={3} />
      <FlexBoxes activebounding={activebounding} id={4} />
      <FlexBoxes activebounding={activebounding} id={5} />
      <FlexBoxes activebounding={activebounding} id={6} />
    </div>
  );
};

MovieList.propTypes = propTypes;
