import * as React from 'react';
import { Link, Navigate } from 'react-router-dom';
import * as Page from '../../route/redirects';
import Notification from 'cogo-toast';

import { authenticate } from '../../services/Loginservice';
import { storeSession } from '../../services/LocalSessionService';

import './Loginform.css';

export default class Loginform extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loginErrors: "",
      redirect: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    console.log("Login attempt");
    let { hide } = Notification.loading("Waiting for Cloud service...", { hideAfter: 0 });
    authenticate(
      {
        email: this.state.email,
        password: this.state.password
      })
      .then(response => {
        if (response.data) {
          hide();
          console.log("Login response", response.data);
          storeSession(response.data);
          this.setState({ redirect: Page.START });
          Notification.success("Welcome " + response.data.username + "!");
        }
      })
      .catch(error => {
        hide();
        console.log(error.response.data);
        Notification.error(error.response.data.errorMessage);
      })

    event.preventDefault();
    this.setState({
      email: "",
      password: ""
    });
  }

  render() {
    if (this.state.redirect) {
      return <Navigate replace to={this.state.redirect} />
    }

    return (
      <div className="box">
        <form className="loginform" onSubmit={this.handleSubmit}>
          <input className="input"
            type="email"
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleChange}
            required
          />
          <input className="input"
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />
          <button type="submit" className="loginbutton">Login</button>
        </form>
        <Link to={Page.REGISTER} >
          <div className="label-register">Register</div>
        </Link>
      </div>
    );
  }
}