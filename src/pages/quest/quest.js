import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";

import Notification from 'cogo-toast';
import HeroQuest from '../../components/quest/HeroQuest';
import OverlordQuest from '../../components/quest/OverlordQuest';

import { isUserOverlord } from '../../services/GameService';
import { storeQuestMap } from '../../services/LocalSessionService';
import { getMapById } from '../../services/MapService';

import './quest.css';

export default function Quest(props) {

    const { state } = useLocation();
    const [activeQuest, setActiveQuest] = useState(state.quest);
    const [questMap, setMap] = useState(null);

    useEffect(() => {
        // fetchData2();
    });

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         activeQuest: getActiveQuest(),
    //         questMap: null,
    //         playerHero: null,
    //         isLoading: true,
    //         testing: props.location,
    //         redirect: ""
    //     }
    // }

    // componentDidMount() {
    //     isloggedin()
    //         .then((loggedIn) => {
    //             if (loggedIn) {
    //                 console.log("Authenticated: fetching data");
    //                 this.fetchData();
    //             } else {
    //                 console.log("Session has ended. Please login");
    //                 Notification.info("Session has ended. Please login");
    //                 endSession();
    //                 this.setState({
    //                     redirect: "/login"
    //                 });
    //             }
    //         })
    // }

    if (isUserOverlord()) {
        return (
            <div id="quest-container">
                <OverlordQuest quest={activeQuest} map={questMap} />
            </div>
        );
    }
    return (
        <div id="quest-container">
            <HeroQuest quest={activeQuest} map={questMap} />
        </div>
    );
}

const fetchData = (activeQuest) => {
    // start to preload data for components
    let { hide } = Notification.loading("Waiting for Cloud service...", { hideAfter: 0 });

    // load quest map
    console.log("Loading quest map...");
    getMapById(activeQuest.gameMap)
        .then(response => {
            if (response.data) {
                console.log("Response", response.data);
                storeQuestMap(response.data);
                this.setMap(response.data);
            }
        })
        .catch(error => {
            this.handleError(error);
        });

    // data fetch is over, hide spinner
    hide();
};

const fetchData2 = async () => {
    // start to preload data for components
    let { hide } = Notification.loading("Waiting for Cloud service...", { hideAfter: 0 });

    // load quest map
    console.log("Loading quest map...");
    try {
        const response = await getMapById(this.activeQuest.gameMap);
        console.log("REST response", response.data);
        storeQuestMap(response.data);
        this.setMap(response.data);
    } catch (error) {
        handleError(error);
    }
};

// extractPlayerHero() {
//     let sessionUserId = getUserId();

//     for (let i = 0; i < state.quest.heroes.length; i++) {

//         if (state.quest.heroes[i].playedBy.userId === sessionUserId) {
//             return state.quest.heroes[i];
//         }
//     }
// }

const handleError = (error) => {
    if (error.response) {
        console.log(error.response);
        if (error.response.data) {
            Notification.error(error.response.data.errorMessage);
        } else {
            Notification.error(error.response.status + " : " + error.response.statusText);
        }
    } else {
        console.log(error);
        Notification.error("Something went terribly wrong!");
    }
};

    // render() {
    //     if (this.state.redirect) {
    //         console.log("redirect to: ", this.state.redirect);
    //         return <Navigate replace to={this.state.redirect} />
    //     }

    //     if (this.state.isLoading) {
    //         return null;
    //     }

    //     return (
    //         // <div id="quest-container">
    //         //     <GameMap quest={this.state.activeQuest} map={this.state.questMap} />
    //         //     <div id="heroes"></div>
    //         //     <div id="monsters"></div>
    //         // </div>
    //         <div>
    //             <Container fluid>
    //                 <Row>
    //                     <Col></Col>
    //                 </Row>
    //                 <Row>
    //                     {/* <Col><GameMap quest={this.state.activeQuest} map={this.state.questMap} /></Col>
    //                     <Col>{this.state.playerHero != null && <HeroSheet hero={this.state.playerHero} />}</Col> */}
    //                 </Row>
    //                 <Row>
    //                     <Col></Col>
    //                     <Col></Col>
    //                     <Col></Col>
    //                 </Row>
    //             </Container>
    //         </div>
    //     );
    // }
