import React, { Component } from 'react';

/**
 * COMPONENT
 */

class About extends Component {
  render() {
    return (
      <div>
        <br />
        <br />
        <br />
        <h1>Blockchain + Loot Boxes + Memes = CryptoLoot</h1>
        <hr />
        <font>
          CryptoLoot is an exchange built on the Ethereum blockchain that allows
          for users to collect and have digital ownership of memes by securing
          their ownership on the Ethereum network.
        </font>
        <div className="container">
          <h3>Built Using</h3>
          <img
            className="icon-padding"
            alt="Metamask Icon"
            src={`http://localhost:3000/images/Metamask-Icon.png`}
            height="200px"
            width="200px"
          />
          <img
            className="icon-padding"
            alt="Truffle Icon"
            src={`http://localhost:3000/images/Truffle-Icon.png`}
            height="200px"
            width="200px"
          />
          <img
            className="icon-padding"
            alt="Ganache Icon"
            src={`http://localhost:3000/images/Ganache-Icon.png`}
            height="200px"
            width="200px"
          />
          <img
            className="icon-padding"
            alt="React Icon"
            src={`http://localhost:3000/images/React-Icon.png`}
            height="200px"
            width="200px"
          />
        </div>
      </div>
    );
  }
}

export default About;
