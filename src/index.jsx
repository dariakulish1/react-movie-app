import React from 'react';
import ReactDOM from 'react-dom';
import { MovieApp } from './components/MovieApp';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <MovieApp />
    </BrowserRouter>
  </React.StrictMode>,
);
