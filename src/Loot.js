import React, { Component } from 'react';

/**
 * COMPONENT
 */

class Loot extends Component {
  render() {
    return (
      <div>
        <h1>Congratulations! You now own: {this.props.match.params.memeId}</h1>
      </div>
    );
  }
}

export default Loot;
