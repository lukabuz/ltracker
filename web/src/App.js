import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import LoginPage from './Components/LoginPage';
import LightersPage from './Components/LightersPage';
import Navbar from './Components/Navbar';
import BottomBar from './Components/BottomBar';
import Modal from './Components/Modal';
import AddLighterPage from './Components/AddLighterPage';
import UserPage from './Components/UserPage';

export class App extends Component {
  state = {
    isLoggedIn: true,
    username: 'Sam',
    password: '',
    modal: {
      isActive: false,
      question: '',
      message: '',
      action: null,
    },
  };

  disableModal = () => {
    this.setState(state => ({
      modal: { ...state.modal, isActive: false },
    }));
  };

  setModal = (question, message, action) => {
    this.setState({
      modal: {
        isActive: true,
        question,
        message,
        action,
      },
    });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleLogin = e => {
    const user = {
      username: this.state.username,
      password: this.state.password,
    };

    fetch(
      'https://us-central1-ltracker-f226f.cloudfunctions.net/ltracker-f226f/us-central1/logIn',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(user),
      }
    )
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(e => console.log(e));
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
        <Modal
          isActive={this.state.modal.isActive}
          question={this.state.modal.question}
          message={this.state.modal.message}
          action={this.state.modal.action}
          disableModal={this.disableModal}
        />

        <BrowserRouter>
          <Navbar username={this.state.username} />

          <Switch>
            <Route
              exact
              path="/add-lighter"
              render={props => (
                <AddLighterPage
                  username={this.state.username}
                  password={this.state.password}
                  setModal={this.setModal}
                  {...props}
                />
              )}
            />
            <Route
              path="/user/:userId"
              render={props => (
                <UserPage
                  username={this.state.username}
                  password={this.state.password}
                  setModal={this.setModal}
                  {...props}
                />
              )}
            />
            <Route
              render={props => (
                <LightersPage
                  username={this.state.username}
                  password={this.state.password}
                  setModal={this.setModal}
                  {...props}
                />
              )}
            />
          </Switch>

          <BottomBar />
        </BrowserRouter>
      </>
    );
  }
}

export default App;
