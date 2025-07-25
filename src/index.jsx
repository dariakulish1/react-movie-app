import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider as StoreProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './redux/store';
import { App } from './components/App';
import './i18n';

import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <BrowserRouter basename="/react-movie-app">
        <Suspense fallback={<div>Loading</div>}>
          <App />
        </Suspense>
      </BrowserRouter>
    </StoreProvider>
  </React.StrictMode>,
);
