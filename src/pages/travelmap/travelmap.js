import React from 'react';
import { Navigate } from "react-router-dom";
import { isSessionActive } from '../../services/LocalSessionService';
import './travelmap.css';

export default class Travelmap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: ""
        }
    }

    componentDidMount() {
        // if (!isSessionActive) {
        //     this.setState({
        //         redirect: "/login"
        //     });
        // }
    }

    render() {
        if (this.state.redirect) {
            console.log("redirect to: ", this.state.redirect);
            return <Navigate replace to={this.state.redirect} />
        }

        return (
            <div className="travelmappage">
                <div className="travelmapcover">
                    
                </div>
            </div>
        );
    }
}