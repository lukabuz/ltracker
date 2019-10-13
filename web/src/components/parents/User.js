import React, { Component } from 'react';
import { getLighterData, getUserData, claimLighter, reportLighter } from '../../api/APIUtils';

import Lighter from '../children/Lighter';
import Loader from '../children/Loader';

import { objectToArray } from '../../helperFunctions';

export class User extends Component {
  state = {
    lighters: [],
    users: [],
  };

  fetchApi = () => {
    getLighterData()
      .then(result => {
        this.setState({
          lighters: result,
        });
      })
      .catch(error => console.log(error));

    getUserData()
      .then(result => {
        this.setState({
          users: objectToArray(result),
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

  componentDidMount() {
    this.fetchApi();
  }

  render() {
    if (this.state.lighters.length < 1 || this.state.users.length < 1) return <Loader />;

    return (
      <div className="lighters-container">
        {this.state.lighters
          .filter(lighter => lighter.current_owner === this.props.match.params.userId)
          .map(lighter => {
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

export default User;
