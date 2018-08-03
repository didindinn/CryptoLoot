import React, { Component } from 'react';
import SimpleStorageContract from '../build/contracts/SimpleStorage.json';
import getWeb3 from './utils/getWeb3';

import './css/oswald.css';
import './css/open-sans.css';
import './css/pure-min.css';
import './App.css';

import Meme from './Meme.js';
import jsonMemes from './memes.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      memes: [],
      storageValue: 0,
      web3: null,
    };
  }

  componentDidMount() {
    this.setState({ memes: jsonMemes });
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
      .then(results => {
        this.setState({
          web3: results.web3,
        });

        // Instantiate contract once web3 provided.
        this.instantiateContract();
      })
      .catch(() => {
        console.log('Error finding web3.');
      });
  }

  instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    const contract = require('truffle-contract');
    const simpleStorage = contract(SimpleStorageContract);
    simpleStorage.setProvider(this.state.web3.currentProvider);

    // Declaring this for later so we can chain functions on SimpleStorage.
    var simpleStorageInstance;

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      simpleStorage
        .deployed()
        .then(instance => {
          simpleStorageInstance = instance;

          // Stores a given value, 5 by default.
          return simpleStorageInstance.set(5, { from: accounts[0] });
        })
        .then(result => {
          // Get the value from the contract to prove it worked.
          return simpleStorageInstance.get.call(accounts[0]);
        })
        .then(result => {
          // Update state with the result.
          return this.setState({ storageValue: result.c[0] });
        });
    });
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
          <a href="#" className="pure-menu-heading pure-menu-link">
            CryptoLoot
          </a>
        </nav>
        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <img
                alt="LootBox"
                className="loot-img"
                height="300px"
                width="300px"
                src="http://pic.90sjimg.com/design/01/13/48/71/58f6c5d690e51.png"
              />
              <br />
              <br />
              <button
                className="btn btn-default btn-adopt"
                type="submit"
                data-id="0"
              >
                <a href="loot.html">Loot!</a>
              </button>
              <br />
              <br />
              <div className="row">
                {this.state.memes.map(meme => {
                  return (
                    <div key={meme.id} className="col-4">
                      <Meme meme={meme} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
