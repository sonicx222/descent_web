import * as React from 'react';
import { Navigate } from "react-router-dom";
import Notification from 'cogo-toast';
import { endSession } from "../../services/LocalSessionService";
import { logout } from '../../services/Loginservice';

export default class Logout extends React.Component {

    componentDidMount() {
        let { hide } = Notification.loading("Waiting for Cloud service...", { hideAfter: 0 });
        logout()
            .then(response => {
                hide();
                endSession();
            })
            .catch(error => {
                hide();
                console.log(error.response.data);
                Notification.error(error.response.data.errorMessage);
            })
    }

    render() {
        return <Navigate replace to="/login" />
    }
}