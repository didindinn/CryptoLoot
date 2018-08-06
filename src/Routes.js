import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import App from './App';
import Loot from './Loot';
import Marketplace from './Marketplace';
import About from './About';

/**
 * COMPONENT
 */

class Routes extends Component {
  render() {
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/" component={App} />
        <Route exact path="/marketplace" component={Marketplace} />
        <Route exact path="/about" component={About} />
        <Route exact path="/loot/:memeId" component={Loot} />

        {/* Displays our App component as a fallback */}
        <Route component={App} />
      </Switch>
    );
  }
}

export default Routes;
