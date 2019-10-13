import React, { Component } from 'react';

export class User extends Component {
  componentDidMount() {
    console.log(this.props.match.params.userId);
  }

  render() {
    return <div>ProfilePage</div>;
  }
}

export default User;
