import React, { Component } from 'react';
import AdoptionContract from '../build/contracts/Adoption.json';
import getWeb3 from './utils/getWeb3';
import history from './history';

import './css/oswald.css';
import './css/open-sans.css';
import './css/pure-min.css';
import './App.css';

import jsonMemes from './memes.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      memes: [],
      looted: [],
      memeId: 0,
      web3: null,
      adoptionInstance: null,
    };
    this.handleLoot = this.handleLoot.bind(this);
  }

  componentDidMount() {
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
    const adoption = contract(AdoptionContract);
    adoption.setProvider(this.state.web3.currentProvider);

    // Declaring this for later so we can chain functions on Adoption.
    var adoptionInstance;

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      adoption.deployed().then(instance => {
        adoptionInstance = instance;

        adoptionInstance.getAdopters
          .call()
          .then(adopters => {
            return adopters;
          })
          .then(adopters => {
            const looted = [];

            for (let i = 0; i < adopters.length; i++) {
              if (
                adopters[i] === '0x0000000000000000000000000000000000000000'
              ) {
                looted.push({ status: false });
              } else {
                looted.push({ status: true, ownerAddress: adopters[i] });
              }
            }

            return this.setState({
              memes: jsonMemes,
              looted,
              adoptionInstance,
            });
          });
      });
    });
  }

  async handleLoot(event) {
    event.preventDefault();

    const account = this.state.web3.eth.accounts[0];

    const adopters = await this.state.adoptionInstance.getAdopters.call();

    const remainingMemes = [];

    for (let i = 0; i < adopters.length; i++) {
      if (adopters[i] === '0x0000000000000000000000000000000000000000') {
        remainingMemes.push(i);
      }
    }

    const randomMemeId =
      remainingMemes[Math.floor(Math.random() * remainingMemes.length)];

    if (randomMemeId === undefined) {
      console.log('All the memes are taken!');
      return null;
    }

    this.setState({ memeId: randomMemeId });

    // Execute adopt as a transaction by sending account
    await this.state.adoptionInstance.adopt(randomMemeId, {
      from: account,
    });

    history.push(`/loot/${this.state.memeId}`);
  }

  render() {
    if (this.state.adoptionInstance === null) {
      return (
        <div>
          <br />
          <br />
          <h1>
            <center>Please Wait...</center>
          </h1>
        </div>
      );
    } else {
      return (
        <div className="App">
          <main className="container">
            <div className="pure-g">
              <div className="pure-u-1-1">
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
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
                  className="btn btn-warning btn-adopt"
                  type="submit"
                  onClick={this.handleLoot}
                >
                  Loot!
                </button>
              </div>
            </div>
          </main>
        </div>
      );
    }
  }
}

export default App;
