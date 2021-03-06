import React from 'react';
import ReactDOM from 'react-dom';
import Loadable from 'react-loadable';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';

// import registerServiceWorker from './registerServiceWorker';
// const store = configureStore( window.__REDUX_STATE__ || {} );

const AppBundle = (
  <BrowserRouter>
      <App />
  </BrowserRouter>
);

window.onload = () => {
    Loadable.preloadReady().then(() => {
        ReactDOM.hydrate(
            AppBundle,
            document.getElementById('root')
        );
    });
};

// registerServiceWorker();