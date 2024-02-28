import React from 'react';
import './FlexBoxes.scss';
import serverImg from '../../images/posterimg.jpg';
import bounding from '../../images/bounding-24.svg';
import solidStar from '../../images/star-solid.svg';

export const FlexBoxes = () => {
  return (
    <div className="flex-box">
      <img className="flex-box__img" src={serverImg} alt="" />
      <div className="bottom-panel">
        <div className="bottom-panel__rating">
          <p className="bottom-panel__rating-num">
            <img className="solid-star" src={solidStar} alt="" />
            8.0
          </p>
        </div>
        <div className="bottom-panel__saved-movie">
          <img className="bounding" src={bounding} alt="" />
        </div>
      </div>
      <div className="flex-box__movie-titles">
        <p className="title">Movie title</p>
        <p className="original-title">Movie original title</p>
        <p className="genres">Genre 1</p>
        <div className="age">18+</div>
        <div className="quality">Full HD</div>
        <div className="rate-num">IMDb 8.5</div>
      </div>
    </div>
  );
};
