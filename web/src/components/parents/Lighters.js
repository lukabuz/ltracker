import React, { Component } from 'react';

import Lighter from '../children/Lighter';
import Loader from '../children/Loader';

import { getLighterData, claimLighter, reportLighter } from '../../api/APIUtils';

export class Lighters extends Component {
  state = {
    lighters: [],
  };

  componentDidMount() {
    this.updateLighters();
  }

  updateLighters = () => {
    getLighterData()
      .then(result => {
        this.setState({
          lighters: result,
        });
      })
      .catch(error => console.log(error));
  };

  handleClaimLighter = e => {
    this.props.setModal(
      'Are you sure you want to claim a lighter?',
      'blabla blabla blabla',
      'confirm',
      () => claimLighter(() => console.log('aaaa'))
    );
  };

  handleReportLighter = e => {
    this.props.setModal(
      'Are you sure you want to report a lighter?',
      'blabla blabla blabla',
      'confirm',
      () => reportLighter(() => console.log('bbbb'))
    );
  };

  render() {
    if (this.state.lighters.length < 1) return <Loader />;

    return (
      <div className="lighters-container">
        {this.state.lighters.map(lighter => {
          return (
            <Lighter
              claim={this.handleClaimLighter}
              report={this.handleReportLighter}
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

export default Lighters;
