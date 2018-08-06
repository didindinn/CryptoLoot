import React, { Component } from 'react';
import Meme from './Meme';
import jsonMemes from './memes.js';

import AdoptionContract from '../build/contracts/Adoption.json';
import getWeb3 from './utils/getWeb3';

/**
 * COMPONENT
 */

class Marketplace extends Component {
  constructor() {
    super();
    this.state = {
      memes: [],
      looted: [],
    };
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
            });
          });
      });
    });
  }

  render() {
    if (this.state.memes.length === 0) {
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
        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
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
      );
    }
  }
}

export default Marketplace;
