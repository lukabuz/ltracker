import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import Login from './components/parents/Login';
import Lighters from './components/parents/Lighters';
import AddLighter from './components/parents/AddLighter';
import User from './components/parents/User';

import Navbar from './components/children/Navbar';
import BottomBar from './components/children/BottomBar';
import Modal from './components/children/Modal';
import PrivateRoute from './components/children/PrivateRoute';

export class App extends Component {
  state = {
    test: 't',
    username: localStorage.getItem('username') || '',
    password: localStorage.getItem('password') || '',
    modal: {
      isActive: false,
      title: '',
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

  setModal = (title, message, type, action = null) => {
    this.setState({
      modal: {
        isActive: true,
        title,
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
      <BrowserRouter>
        <Modal
          isActive={this.state.modal.isActive}
          title={this.state.modal.title}
          message={this.state.modal.message}
          action={this.state.modal.action}
          disableModal={this.disableModal}
          type={this.state.modal.type}
        />
        <Navbar username={this.state.username} />
        <Switch>
          <Route
            exact
            path="/login"
            render={props => (
              <Login
                username={this.state.username}
                password={this.state.password}
                handleInput={this.handleChange}
                setModal={this.setModal}
                {...props}
              />
            )}
          />
          <PrivateRoute
            path="/add-lighter"
            component={props => (
              <AddLighter
                username={this.state.username}
                password={this.state.password}
                setModal={this.setModal}
                {...props}
              />
            )}
          />
          <PrivateRoute
            path="/user/:userId"
            component={props => (
              <User
                username={this.state.username}
                password={this.state.password}
                setModal={this.setModal}
                {...props}
              />
            )}
          />
          <PrivateRoute
            component={props => (
              <Lighters
                {...props}
                username={this.state.username}
                password={this.state.password}
                setModal={this.setModal}
              />
            )}
          />
        </Switch>
        <BottomBar />
      </BrowserRouter>
    );
  }
}

export default App;
