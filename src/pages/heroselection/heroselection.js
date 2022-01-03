import React from 'react';
import { Navigate } from "react-router-dom";
import { isSessionActive } from '../../services/Sessionservice';
import './heroselection.css';

export default class HeroSelection extends React.Component {
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
            <div className="heroselectionpage">
                <div className="heroselectioncover">
                    
                </div>
            </div>
        );
    }
}