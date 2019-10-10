import React, { Component } from 'react';
import LoginScreen from './Components/LoginScreen';

export class App extends Component {
  state = {
    isLoggedIn: false,
    username: '',
    password: '',
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleLogin = e => {
    this.setState(state => ({
      isLoggedIn: !state.isLoggedIn,
    }));
  };

  render() {
    if (!this.state.isLoggedIn)
      return (
        <LoginScreen
          handleInput={this.handleChange}
          handleLogin={this.handleLogin}
          username={this.state.username}
          password={this.state.password}
        />
      );
    return <div>App</div>;
  }
}

export default App;
