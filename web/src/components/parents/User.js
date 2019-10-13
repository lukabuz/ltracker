import React, { Component } from 'react';

export class UserPage extends Component {
  componentDidMount() {
    console.log(this.props.match.params.userId);
  }

  render() {
    return <div>ProfilePage</div>;
  }
}

export default UserPage;
