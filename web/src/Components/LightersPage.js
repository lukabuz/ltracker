import React, { Component } from 'react';
import Lighter from './Lighter';

export class LightersPage extends Component {
  state = {
    apiData: [],
  };

  render() {
    return (
      <div className="lighers-container">
        <Lighter data={this.state.apiData} />
        <Lighter data={this.state.apiData} />
        <Lighter data={this.state.apiData} />
      </div>
    );
  }
}

export default LightersPage;
