import React, { Component } from 'react';
import SimpleStorageContract from '../build/contracts/SimpleStorage.json';
import AdoptionContract from '../build/contracts/Adoption.json';
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
      looted: [],
      web3: null,
      adoptionInstance: null,
      storageValue: 0,
    };
    this.handleLoot = this.handleLoot.bind(this);
  }

  async componentDidMount() {
    // TRY PERFORMING AN ASYNC AWAIT ON SETSTATE IN COMPONENTWILLMOUNT
    console.log('adoptionInstance', this.state.adoptionInstance);
    const adopters = await this.state.adoptionInstance.getAdopters.call();

    const looted = [];

    for (let i = 0; i < adopters.length; i++) {
      if (adopters[i] === '0x0000000000000000000000000000000000000000') {
        looted.push({ status: false });
      } else {
        looted.push({ status: true, ownerAddress: adopters[i] });
      }
    }

    this.setState({ memes: jsonMemes, looted });
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

    const adoption = contract(AdoptionContract);
    adoption.setProvider(this.state.web3.currentProvider);

    // Declaring this for later so we can chain functions on SimpleStorage.
    var simpleStorageInstance;
    var adoptionInstance;

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

      adoption.deployed().then(instance => {
        adoptionInstance = instance;
        return this.setState({ adoptionInstance });
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

    console.log('ADOPTERS: ', adopters);

    // Execute adopt as a transaction by sending account
    return await this.state.adoptionInstance.adopt(randomMemeId, {
      from: account,
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
                onClick={this.handleLoot}
              >
                <a>Loot!</a>
              </button>
              <br />
              <br />
              <div className="row">
                {this.state.memes.map(meme => {
                  return (
                    <div key={meme.id} className="col-4">
                      <Meme meme={meme} looted={this.state.looted[meme.id]} />
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
