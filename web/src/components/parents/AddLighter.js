import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { addLighter } from '../../api/APIUtils';

export class AddLighter extends Component {
  state = {
    lighterNumber: '',
    lighterColor: '',
    lighterDescription: '',
  };

  handleSubmit = e => {
    e.preventDefault();

    addLighter(
      this.props.username,
      this.props.password,
      this.state.lighterNumber,
      this.state.lighterColor,
      this.state.lighterDescription
    )
      .then(result => {
        if (result.status === 'success') {
          const { location, history } = this.props;
          let { from } = location.state || { from: { pathname: '/' } };

          history.replace(from);

          this.props.setModal('Success', ['You have successfuly added a lighter'], 'alert');
        } else if (result.status === 'error') {
          this.props.setModal('Error', result.errors, 'alert');
        }
      })
      .catch(error => console.log(error));
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <div className="lighter-add">
        <div className="lighter-gif-background"></div>
        <div className="lighter-add-wrapper">
          <h1>Add a lighter</h1>
          <form onSubmit={this.handleSubmit}>
            <input
              placeholder="Id"
              name="lighterNumber"
              type="text"
              onChange={this.handleChange}
              value={this.state.lighterNumber}
            />
            <input
              placeholder="Color"
              name="lighterColor"
              type="text"
              onChange={this.handleChange}
              value={this.state.lighterColor}
            />
            <textarea
              placeholder="Lighter description..."
              name="lighterDescription"
              onChange={this.handleChange}
              value={this.state.lighterDescription}
              rows="3"
            />
            <input type="submit" className="btn" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(AddLighter);
