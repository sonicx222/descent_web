import React from 'react';
import { Navigate } from "react-router-dom";

import './prolog.css';

export default class Prolog extends React.Component {
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
            <div className="prologpage">
                <div className="prologcover">
                    
                </div>
            </div>
        );
    }
}