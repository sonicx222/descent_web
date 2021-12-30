import React from 'react';
import { Navigate } from "react-router-dom";
import Startmenu from '../../components/Startmenu/Startmenu';
import { isSessionActive } from '../../services/Sessionservice';
import './start.css';

export default class Start extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: ""
        }
    }

    componentDidMount() {
        console.log("start:componentDidMount");
        if (!isSessionActive) {
            this.setState({
                redirect: "/login"
            });
        }
    }

    render() {
        if (this.state.redirect) {
            console.log("redirect to: ", this.state.redirect);
            return <Navigate replace to={this.state.redirect} />
        }

        return (
            <div className="startpage">
                <div className="startcover">
                    <Startmenu />
                </div>
            </div>
        );
    }
}