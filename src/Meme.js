import React, { Component } from 'react';

class Meme extends Component {
  render() {
    let meme = this.props.meme;
    return (
      <div id="memeTemplate">
        <div className="col-sm-6 col-md-4 col-lg-3">
          <div className="panel panel-default panel-meme">
            <div className="panel-heading">
              <h3 className="panel-title">{meme.name}</h3>
            </div>
            <div className="panel-body">
              <img
                alt="Meme"
                className="img-rounded img-center"
                height="300px"
                width="300px"
                src={meme.picture}
                data-holder-rendered="true"
              />
              <br />
              <br />
              <strong>Rarity: </strong>
              <span className="meme-rarity">{meme.rarity}</span>
              <br />
              <br />
              {!this.props.looted.status ? (
                <div>
                  <span className="meme-adopted">Not Looted</span>
                  <br />
                  <br />
                  <br />
                </div>
              ) : (
                <div>
                  <div className="word-limit">
                    Owner: {this.props.looted.ownerAddress}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Meme;
