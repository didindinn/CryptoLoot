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
        <h2>
          CryptoLoot is an exchange built on the Ethereum blockchain that allows
          for users to have digital ownership of memes by securing their
          ownership on the blockchain.
        </h2>
        <h3>Built Using</h3>
        <div className="container">
          <img
            alt="Metamask Icon"
            src={`http://localhost:3000/images/Metamask-Icon.png`}
            height="200px"
            width="200px"
          />
          <img
            alt="Truffle Icon"
            src={`http://localhost:3000/images/Truffle-Icon.png`}
            height="200px"
            width="200px"
          />
          <img
            alt="Ganache Icon"
            src={`http://localhost:3000/images/Ganache-Icon.png`}
            height="200px"
            width="200px"
          />
          <img
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
