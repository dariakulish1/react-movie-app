import React from 'react';
import './FlexBoxes.scss';
import { ServerImg } from '../../images/ServerImg.png';
import { Bounding } from '../../images/bounding-24.svg';
import { SolidStar } from '../../images/star-solid.svg';
export const FlexBoxes = () => {
  return (
    <div className="FlexBox">
      {/* <ServerImg /> */}
      <div className="ArtDiv">
        <div className="Rating">
          {/* <SolidStar /> */}
          <p className="RatingNum">8.0</p>
        </div>
        <div className="SavedMovie">{/* <Bounding /> */}</div>
        <div className="MovieTitles">
          <h3>Movie title</h3>
        </div>
      </div>
    </div>
  );
};
