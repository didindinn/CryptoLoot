import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import history from './history';
import Routes from './Routes';
import Navbar from './Navbar';

ReactDOM.render(
  <Router history={history}>
    <div>
      <Navbar />
      <Routes />
    </div>
  </Router>,
  document.getElementById('root')
);
