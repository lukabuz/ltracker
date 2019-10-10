import React, { Component } from 'react';
import LoginPage from './Components/LoginPage';
import LightersPage from './Components/LightersPage';
import Navbar from './Components/Navbar';
import BottomBar from './Components/BottomBar';

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
        <LoginPage
          handleInput={this.handleChange}
          handleLogin={this.handleLogin}
          username={this.state.username}
          password={this.state.password}
        />
      );

    return (
      <>
        <Navbar />
        <LightersPage username={this.state.username} password={this.state.password} />
        <BottomBar />
      </>
    );
  }
}

export default App;
