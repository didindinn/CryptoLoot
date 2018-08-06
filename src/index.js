import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import history from './history';
import Routes from './Routes';
import App from './App';

ReactDOM.render(
  <Router history={history}>
    <div>
      <Routes />
      <App />
    </div>
  </Router>,
  document.getElementById('root')
);
