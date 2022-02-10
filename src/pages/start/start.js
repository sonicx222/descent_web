import React from 'react';
import { Navigate } from "react-router-dom";
import * as Page from '../../route/redirects';
import Notification from 'cogo-toast';
import Startmenu from '../../components/Startmenu/Startmenu';

import { isloggedin } from '../../services/Loginservice';
import { endSession } from '../../services/LocalSessionService';

import './start.css';

export default class Start extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: ""
        }
    }

    componentDidMount() {
        isloggedin()
            .then((loggedIn) => {
                if (loggedIn) {
                    console.log("Authenticated");
                } else {
                    console.log("Session has ended. Please login");
                    Notification.info("Session has ended. Please login");
                    endSession();
                    this.setState({
                        redirect: Page.LOGIN
                    });
                }
            })
    }

    render() {
        if (this.state.redirect) {
            console.log("redirect to: ", this.state.redirect);
            return <Navigate replace to={this.state.redirect} />
        }

        return (
            <div className="login-start-cover">
                <div className="vertical-align ">
                    <Startmenu />
                </div>
            </div>
        );
    }
}