import React from 'react';
import { Navigate } from "react-router-dom";
import GameMap from '../../components/GameMap/GameMap';

import './quest.css';

export default class Quest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeQuest: null,
            isLoading: true,
            redirect: ""
        }
    }

    render() {
        if (this.state.redirect) {
            console.log("redirect to: ", this.state.redirect);
            return <Navigate replace to={this.state.redirect} />
        }

        return (
            <div id="quest-container">
                <GameMap />
                <div id="heroes"></div>
                <div id="monsters"></div>
            </div>
        );
    }
}