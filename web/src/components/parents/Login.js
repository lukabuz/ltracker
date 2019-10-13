import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import auth from '../../auth';

class Login extends Component {
  success = () => {
    const { location, history } = this.props;
    let { from } = location.state || { from: { pathname: '/' } };

    history.replace(from);
  };

  failure = () => {
    this.props.setModal('Error', 'Invalid login credentials', 'alert');
  };

  handleLogin = () => {
    const credentials = {
      username: this.props.username,
      password: this.props.password,
    };

    auth.login(credentials, this.success, this.failure);
  };

  componentDidMount() {
    if (this.props.username.length > 0 && this.props.password.length > 0) {
      this.handleLogin();
    }
  }

  render() {
    return (
      <div className="login-screen">
        <div className="login-wrapper">
          <h1 className="logo">Ltracker</h1>
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
          <button className="btn" onClick={this.handleLogin}>
            SIGN IN
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
