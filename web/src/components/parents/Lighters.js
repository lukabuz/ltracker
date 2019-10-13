import React, { Component } from 'react';

import Lighter from '../children/Lighter';
import Loader from '../children/Loader';

export class LightersPage extends Component {
  state = {
    lighters: {},
  };

  componentDidMount() {
    this.getLighterData();
  }

  getLighterData = () => {
    fetch('https://ltracker-f226f.firebaseio.com/lighters.json')
      .then(response => response.json())
      .then(lighters => {
        this.setState({
          lighters,
        });
      });
  };

  claimLighter = e => {
    this.props.setModal(
      'Are you sure you want to claim a lighter?',
      'blabla blabla blabla',
      'confirm',
      () => console.log('good job!')
    );
  };

  reportMissingLighter = e => {
    this.props.setModal(
      'Are you sure you want to report a lighter?',
      'blabla blabla blabla',
      'confirm',
      () => console.log('good job!')
    );
  };

  objectToArray = obj => {
    let output = [];
    for (let key of Object.keys(obj)) {
      output.push(obj[key]);
    }
    return output;
  };

  render() {
    if (Object.keys(this.state.lighters) < 1) return <Loader />;

    return (
      <div className="lighters-container">
        {this.objectToArray(this.state.lighters).map(lighter => {
          return (
            <Lighter
              claim={this.claimLighter}
              report={this.reportMissingLighter}
              username={this.props.username}
              data={lighter}
              key={lighter.number}
            />
          );
        })}
      </div>
    );
  }
}

export default LightersPage;
