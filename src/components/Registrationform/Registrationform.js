import * as React from 'react';
import { Navigate } from "react-router-dom";
import Notification from 'cogo-toast';
import { registerUser } from '../../services/Registrationservice';
import './Registrationform.css';

export default class Registrationform extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            username: "",
            password: "",
            password_confirmation: "",
            errors: {},
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
        let { hide } = Notification.loading("Waiting for Cloud service...", { hideAfter: 0 });
        let errors = {};

        if (this.formIsValid()) {
            console.log("Submit form");
            registerUser(
                {
                    email: this.state.email,
                    username: this.state.username,
                    password: this.state.password
                })
                .then(response => {
                    hide();
                    console.log("Registration response", response.data);
                    this.setState({ redirect: "/login" });
                    Notification.success("Registration successful. Please log in.");
                })
                .catch(error => {
                    hide();
                    console.log(error.response.data);
                    errors["register"] = error.response.data.errorMessage;
                    Notification.error(error.response.data.errorMessage);
                });
            this.setState({
                email: "",
                username: "",
                password: "",
                password_confirmation: ""
            });

        }

        event.preventDefault();
    }

    formIsValid() {
        let isValid = true;
        let errors = {};

        if (this.state.password && this.state.password_confirmation) {
            if (this.state.password !== this.state.password_confirmation) {
                errors["password"] = "No match!";
                isValid = false;
            }
        }

        this.setState({ errors: errors });
        return isValid;
    }

    render() {
        if (this.state.redirect) {
            return <Navigate replace to={this.state.redirect} />
        }

        return (
            <div className="box">
                <form className="registrationform" onSubmit={this.handleSubmit}>
                    <input className="input"
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        required
                    />
                    <input className="input"
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={this.state.username}
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
                    <span className="errortext">{this.state.errors["password"]}</span>
                    <input className="input"
                        type="password"
                        name="password_confirmation"
                        placeholder="Password Confirmation"
                        value={this.state.password_confirmation}
                        onChange={this.handleChange}
                        required
                    />
                    <span className="errortext">{this.state.errors["password"]}</span>
                    <button className="registerbutton" type="submit">Register</button>
                </form>
            </div>
        );
    }
}