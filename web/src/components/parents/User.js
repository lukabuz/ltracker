import React, { Component } from 'react';

import Lighter from '../children/Lighter';
import Loader from '../children/Loader';

import { getLighterData, getUserData } from '../../api/APIUtils';
import { objectToArray } from '../../helperFunctions';

export class User extends Component {
  state = {
    lighters: [],
    users: {},
  };

  fetchApi = () => {
    getLighterData()
      .then(result => {
        this.setState({
          lighters: objectToArray(result),
        });
      })
      .catch(error => console.log(error));

    getUserData()
      .then(result => {
        this.setState({
          users: result,
        });
      })
      .catch(error => console.log(error));
  };

  componentDidMount() {
    this.fetchApi();
  }

  render() {
    if (this.state.lighters.length < 1 || Object.keys(this.state.users).length < 1)
      return <Loader />;

    const userPageURL = this.props.match.params.userId;
    const ownedLighters = this.state.lighters.filter(
      lighter => lighter.current_owner === userPageURL && lighter.lost_by === ''
    );
    const lostLighters = this.state.lighters.filter(lighter => lighter.lost_by === userPageURL);

    return (
      <>
        <div className="lighters-container">
          <div className="stars-container">
            <h4>{userPageURL}</h4>
            <div className="push-left"></div>
            <span>credit score: {this.state.users[userPageURL].public_info.credit_score}</span>
          </div>
          <h3>
            {userPageURL === this.props.username
              ? `You own ${ownedLighters.length} lighter(s):`
              : `${userPageURL} owns ${ownedLighters.length} lighter(s):`}
          </h3>
          {ownedLighters.map(lighter => {
            return (
              <Lighter
                claim={e => this.props.handleClaimLighter(e, this.fetchApi)}
                report={e => this.props.handleReportLighter(e, this.fetchApi)}
                username={this.props.username}
                data={lighter}
                key={lighter.number}
              />
            );
          })}
          <h3>
            {userPageURL === this.props.username
              ? `You have lost ${lostLighters.length} lighter(s):`
              : `${userPageURL} has lost ${lostLighters.length} lighter(s):`}
          </h3>
          {lostLighters.map(lighter => {
            return (
              <Lighter
                username={this.props.username}
                data={lighter}
                key={lighter.number}
                lost={true}
              />
            );
          })}
          {userPageURL === this.props.username ? (
            <button className="btn red" onClick={this.props.handleSignOut}>
              SIGN OUT
            </button>
          ) : null}
        </div>
      </>
    );
  }
}

export default User;
