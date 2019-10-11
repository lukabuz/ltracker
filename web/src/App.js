import React, { Component } from 'react';
import LoginPage from './Components/LoginPage';
import LightersPage from './Components/LightersPage';
import Navbar from './Components/Navbar';
import BottomBar from './Components/BottomBar';
import Modal from './Components/Modal';

export class App extends Component {
  state = {
    isLoggedIn: false,
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
        <Modal
          isActive={this.state.modal.isActive}
          question={this.state.modal.question}
          message={this.state.modal.message}
          action={this.state.modal.action}
          disableModal={this.disableModal}
        />
        <Navbar />
        <LightersPage
          username={this.state.username}
          password={this.state.password}
          setModal={this.setModal}
        />
        <BottomBar />
      </>
    );
  }
}

export default App;
