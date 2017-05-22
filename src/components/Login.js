import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as user from '../redux/modules/user';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'testing@testing.com',
      password: 'testing'
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.username === '' || this.state.password === '') {
      this.setState({ message: 'Username or password cannot be blank' });
      return;
    }

    const response = this.props.login(this.state.username, this.state.password);
    response.then((message) => {
      this.setState({ message });
    });
  }

  handleSignUp(e) {
    e.preventDefault();
    if (this.state.username === '' || this.state.password === '') return;

    const response = this.props.signup(this.state.username, this.state.password);
    response.then((message) => {
      this.setState({ message });
    });
  }

  handleLogout(e) {
    e.preventDefault();
    this.setState({
      username: '',
      password: ''
    });

    this.props.logout();
  }

  render() {
    return (
      <form className="login" onSubmit={this.handleSubmit}>
        {!this.props.user.authenticated ? (
          <div>
            <span className="error">{this.state.message}</span>
            <input
              type="text"
              name="username"
              onChange={this.handleInputChange}
              placeholder="Email"

            />
            <input
              type="password"
              name="password"
              onChange={this.handleInputChange}
              placeholder="Password"

            />
            <button
              type="submit"
              onClick={this.handleSubmit}
              disabled={this.props.user.isAuthenticating}
            >
              Login
            </button>
            <button
              type="submit"
              onClick={this.handleSignUp}
              disabled={this.props.user.isAuthenticating}
            >
              Sign Up
            </button>
          </div>
        ) : (
          <div>
            Logged in as <strong>{this.props.user.username}</strong>
            <button
              type="button"
              onClick={this.handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </form>
    );
  }
}

const mapStateToProps = ({ user }, props) => {
  return {
    user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signup: (username, password) => dispatch(user.signup(username, password)),
    login: (username, password) => dispatch(user.login(username, password)),
    logout: () => dispatch(user.logout()),
    register: (username, password) => dispatch(user.register(username, password)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
