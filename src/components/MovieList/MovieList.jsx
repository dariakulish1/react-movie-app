import React from 'react';
import './MovieList.scss';
import { ServerImg } from '../../images/ServerImg.png';
import { FlexBoxes } from '../FlexBoxes/FlexBoxes';
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
