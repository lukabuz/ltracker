import React, { Component } from 'react';

export class LoginPage extends Component {
  render() {
    return (
      <div className="login-screen">
        <div className="login-wrapper">
          <h1 class="logo">Ltracker</h1>
          <input
            placeholder="username"
            name="username"
            type="text"
            onChange={this.props.handleInput}
            value={this.props.username}
          />
          <input
            placeholder="password"
            name="password"
            type="password"
            onChange={this.props.handleInput}
            value={this.props.password}
          />
          <button className="btn" onClick={this.props.handleLogin}>
            SIGN IN
          </button>
        </div>
      </div>
    );
  }
}

export default LoginPage;
