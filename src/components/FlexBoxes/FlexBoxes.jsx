import React from 'react';
import './FlexBoxes.scss';
import serverImg from '../../images/posterimg.jpg';
import bounding from '../../images/bounding-24.svg';
import solidStar from '../../images/star-solid.svg';

export const FlexBoxes = ({ activebounding }) => {
  return (
    <div className="flex-box">
      <img className="flex-box__server-img" src={serverImg} alt="" />
      <div className="flex-box__bottom-panel">
        <div className="flex-box__rating-box">
          <p className="flex-box__rating-num">
            <img className="flex-box__solid-star" src={solidStar} alt="" />
            8.0
          </p>
        </div>
        <div className="flex-box__saved-movie">
          {/* <img className="flex-box__bounding" src={bounding} alt="" /> */}
          {activebounding ? (
            activebounding
          ) : (
            <img className="flex-box__bounding" src={bounding} alt="" />
          )}
        </div>
      </div>
      <div className="flex-box__movie-titles">
        <p className="flex-box__main-title">Movie title</p>
        <p className="flex-box__original-title">Movie original title</p>
        <p className="flex-box__movie-genres">Genre 1</p>
        <div className="flex-box__age-limit">18+</div>
        <div className="flex-box__quality">Full HD</div>
        <div className="flex-box__rate-num">IMDb 8.5</div>
      </div>
    </div>
  );
};
