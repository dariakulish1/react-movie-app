import React from 'react';
import '../NavBar/NavBar.scss';
import { Route, Routes } from 'react-router-dom';
import { Favorites } from '../../pages/Favorites/Favorites';

export const NavBar = () => {
  return (
    <div className="NavDiv">
      <div className="NavTop">
        <p className="NameLabel">STRICHKA</p>
        {/* <Routes>
        <Route path="/favorites" element={<Favorites />} />
      </Routes> */}
      </div>
      <input
        className="SearchingBar"
        type="text"
        placeholder="Write film name..."
      />
    </div>
  );
};
