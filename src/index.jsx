import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as StoreProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './redux/store';
import { App } from './components/App';

import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StoreProvider>
  </React.StrictMode>,
);
