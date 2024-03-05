import React from 'react';
import './MovieList.scss';
import { FlexBoxes } from '../FlexBoxes';
import PropTypes from 'prop-types';

const propTypes = {
  activebounding: PropTypes.shape.isRequired,
};
export const MovieList = ({ activebounding }) => {
  return (
    <div className="div-list container">
      <FlexBoxes activebounding={activebounding} />
      <FlexBoxes activebounding={activebounding} />
      <FlexBoxes activebounding={activebounding} />
      <FlexBoxes activebounding={activebounding} />
      <FlexBoxes activebounding={activebounding} />
      <FlexBoxes activebounding={activebounding} />
    </div>
  );
};

MovieList.propTypes = propTypes;
