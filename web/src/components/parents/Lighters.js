import React, { Component } from 'react';

import Lighter from '../children/Lighter';
import Loader from '../children/Loader';

import { getLighterData } from '../../api/APIUtils';
import { objectToArray } from '../../helperFunctions';

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
          lighters: objectToArray(result),
        });
      })
      .catch(error => console.log(error));
  };

  render() {
    if (this.state.lighters.length < 1) return <Loader />;

    return (
      <div className="lighters-container">
        {this.state.lighters
          .filter(lighter => lighter.lost_by === '')
          .map(lighter => {
            return (
              <Lighter
                claim={e => this.props.handleClaimLighter(e, this.updateLighters)}
                report={e => this.props.handleReportLighter(e, this.updateLighters)}
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
