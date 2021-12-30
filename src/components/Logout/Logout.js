import * as React from 'react';
import { Navigate } from "react-router-dom";
import { endSession } from "../../services/Sessionservice";

export default class Logout extends React.Component {
    render() {
        endSession();
        return <Navigate replace to="/login" />
    }
}