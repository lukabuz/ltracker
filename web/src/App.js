import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import LoginPage from './Components/LoginPage';
import LightersPage from './Components/LightersPage';
import Navbar from './Components/Navbar';
import BottomBar from './Components/BottomBar';
import Modal from './Components/Modal';
import AddLighterPage from './Components/AddLighterPage';
import UserPage from './Components/UserPage';
import PriavteRoute from './Components/PrivateRoute';

export class App extends Component {
  state = {
    username: localStorage.getItem('username') || '',
    password: localStorage.getItem('password') || '',
    modal: {
      isActive: false,
      question: '',
      message: '',
      type: 'confirm',
      action: null,
    },
  };

  disableModal = () => {
    this.setState(state => ({
      modal: { ...state.modal, isActive: false },
    }));
  };

  setModal = (question, message, type, action = null) => {
    this.setState({
      modal: {
        isActive: true,
        question,
        message,
        type,
        action,
      },
    });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <>
        <Modal
          isActive={this.state.modal.isActive}
          question={this.state.modal.question}
          message={this.state.modal.message}
          action={this.state.modal.action}
          disableModal={this.disableModal}
          type={this.state.modal.type}
        />

        <BrowserRouter>
          <Navbar username={this.state.username} />
          <Switch>
            <Route
              exact
              path="/login"
              render={props => (
                <LoginPage
                  username={this.state.username}
                  password={this.state.password}
                  handleInput={this.handleChange}
                  setModal={this.setModal}
                  {...props}
                />
              )}
            />
            <PriavteRoute
              path="/add-lighter"
              component={() => (
                <AddLighterPage
                  username={this.state.username}
                  password={this.state.password}
                  setModal={this.setModal}
                />
              )}
            />
            <PriavteRoute
              path="/user/:userId"
              component={() => (
                <UserPage
                  username={this.state.username}
                  password={this.state.password}
                  setModal={this.setModal}
                />
              )}
            />
            <PriavteRoute
              component={() => (
                <LightersPage
                  username={this.state.username}
                  password={this.state.password}
                  setModal={this.setModal}
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
