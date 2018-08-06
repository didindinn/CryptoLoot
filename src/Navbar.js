import React, { Component } from 'react';
import { Link } from 'react-router-dom';

/**
 * COMPONENT
 */

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar pure-menu pure-menu-horizontal">
        <Link to="/" className="pure-menu-heading pure-menu-link">
          CryptoLoot
        </Link>
        <Link to="/about" className="pure-menu-heading pure-menu-link">
          About
        </Link>
        <Link to="/marketplace" className="pure-menu-heading pure-menu-link">
          Marketplace
        </Link>
      </nav>
    );
  }
}

export default Navbar;
