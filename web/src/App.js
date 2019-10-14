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

import auth from './auth';
import { claimLighter, reportLighter } from './api/APIUtils';

export class App extends Component {
  state = {
    username: localStorage.getItem('username') || '',
    password: localStorage.getItem('password') || '',
    modal: {
      isActive: false,
      title: '',
      messages: [],
      type: 'confirm',
      action: null,
    },
  };

  disableModal = () => {
    this.setState(state => ({
      modal: { ...state.modal, isActive: false },
    }));
  };

  setModal = (title, messages, type, action = null) => {
    this.setState({
      modal: {
        isActive: true,
        title,
        messages,
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

  handleClaimLighter = (e, update) => {
    const lighterNumber = e.target.name;

    const onConfirm = () => {
      claimLighter(this.state.username, this.state.password, lighterNumber)
        .then(result => {
          if (result.status === 'success') {
            this.setModal(
              'Success',
              [`You have successfuly claimed #${lighterNumber} lighter.`],
              'alert'
            );
            update();
          } else if (result.status === 'error') {
            this.setModal('Error', result.errors, 'alert');
          }
        })
        .catch(error => console.log(error));
    };

    this.setModal(
      `Are you sure you want to claim #${lighterNumber} lighter?`,
      [
        'Claiming a lighter is one of the biggest responsibilities you can take in your entire life.',
        'Please proceed with caution.',
      ],
      'confirm',
      onConfirm
    );
  };

  handleReportLighter = (e, update) => {
    const lighterNumber = e.target.name;

    const onConfirm = () => {
      reportLighter(this.state.username, this.state.password, lighterNumber)
        .then(result => {
          if (result.status === 'success') {
            this.setModal(
              'Success',
              [`You have successfuly reported a loss on #${lighterNumber} lighter.`],
              'alert'
            );
            update();
          } else if (result.status === 'error') {
            this.setModal('Error', result.errors, 'alert');
          }
        })
        .catch(error => console.log(error));
    };

    this.setModal(
      `Are you sure you want to report #${lighterNumber} lighter?`,
      [
        'Reporting a lighter is one of the biggest responsibilities you can take in your entire life.',
        'Please proceed with caution.',
      ],
      'confirm',
      onConfirm
    );
  };

  handleSignOut = () => {
    auth.logout();
    this.setState({
      password: '',
    });
  };

  render() {
    return (
      <BrowserRouter>
        <Modal
          isActive={this.state.modal.isActive}
          title={this.state.modal.title}
          messages={this.state.modal.messages}
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
                handleClaimLighter={this.handleClaimLighter}
                handleReportLighter={this.handleReportLighter}
                handleSignOut={this.handleSignOut}
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
                handleClaimLighter={this.handleClaimLighter}
                handleReportLighter={this.handleReportLighter}
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
    );
  }
}

export default App;
