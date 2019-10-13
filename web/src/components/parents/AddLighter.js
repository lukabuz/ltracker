import React, { Component } from 'react';

export class AddLighterPage extends Component {
  state = {
    lighterNumber: '',
    lighterColor: '',
    lighterDescription: '',
  };

  handleSubmit = async () => {
    const formData = {
      number: this.state.lighterNumber,
      color: this.state.lighterColor,
      description: this.state.lighterDescription,
      username: this.props.username,
      password: this.props.password,
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/widgets/createLighter`, {
        method: 'POST',
        body: JSON.stringify(formData),
      });
      const body = await response.json();
      console.log(body);
    } catch (e) {
      console.log(e);
    }
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
          <button className="btn" onClick={this.handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    );
  }
}

export default AddLighterPage;
