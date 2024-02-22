import React from 'react';
import './FlexBoxes.scss';
import { ServerImg } from '../../images/ServerImg.png';

export const FlexBoxes = () => {
  return (
    <div className="FlexBox">
      {/* <ServerImg /> */}
      <div className="ArtDiv">
        <div className="Rating">
          <p className="RatingNum">8.0</p>
        </div>
        <div className="SavedMovie"></div>
        <div className="MovieTitles">
          <h3>Movie title</h3>
        </div>
      </div>
    </div>
  );
};
