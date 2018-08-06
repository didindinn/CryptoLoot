import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import memes from './memes';

/**
 * COMPONENT
 */

class Loot extends Component {
  constructor() {
    super();
    this.state = {
      meme: {},
    };
  }

  componentDidMount() {
    const meme = memes.find(element => {
      return element.id === Number(this.props.match.params.memeId);
    });

    this.setState({ meme });
  }

  render() {
    return (
      <div className="container loot-page">
        <br />
        <br />
        <h1>Congratulations!</h1>
        <h3>You are now the proud owner of:</h3>
        <br />
        <div className="panel panel-default panel-meme">
          <div className="panel-heading">
            <h3 className="panel-title">{this.state.meme.name}</h3>
          </div>
          <div className="panel-body">
            <img
              alt="Meme"
              className="img-rounded img-center"
              height="300px"
              width="300px"
              src={`http://localhost:3000/${this.state.meme.picture}`}
              data-holder-rendered="true"
            />
            <br />
            <br />
            <strong>Rarity: </strong>
            <span className={`meme-rarity ${this.state.meme.rarity}`}>
              {this.state.meme.rarity}
            </span>
            <br />
            <br />
          </div>
        </div>
        <Link to="/" className="btn btn-success btn-adopt">
          Back To Looting!
        </Link>
      </div>
    );
  }
}

export default Loot;
