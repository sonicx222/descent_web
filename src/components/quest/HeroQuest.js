import React from 'react';
import { Navigate } from "react-router-dom";
import * as Page from '../../route/redirects';
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap';
import Notification from 'cogo-toast';
import HeroSheet from '../../components/HeroSheet/HeroSheet';
import GameMap from '../../components/GameMap/GameMap';
import MessageBox from '../MessageBox/MessageBox';


import { isloggedin } from '../../services/Loginservice';
import { getUserId, endSession, getActiveQuest, storeQuestMap, getCampaign } from '../../services/LocalSessionService';
import { getMapById, getMapFieldsInRange } from '../../services/MapService';

import './HeroQuest.css';

export default class HeroQuest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            campaign: getCampaign(),
            activeQuest: getActiveQuest(),
            mapFields: null,
            questMap: null,
            playerHero: null,
            actionMode: "",
            actionFunction: null,
            isLoading: true,
            redirect: ""
        }
        this.handleMoveButtonClick = this.handleMoveButtonClick.bind(this);
        this.handleMoveMapClick = this.handleMoveMapClick.bind(this);
    }

    componentDidMount() {
        isloggedin()
            .then((loggedIn) => {
                if (loggedIn) {
                    console.log("Authenticated: fetching data");
                    this.fetchData();
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

    fetchData() {
        // start to preload data for components
        let { hide } = Notification.loading("Waiting for Cloud service...", { hideAfter: 0 });
        let hero = this.extractPlayerHero();

        // load quest map
        console.log("Loading quest map...");
        getMapById(this.state.activeQuest.gameMap)
            .then(response => {
                if (response.data) {
                    console.log("REST response", response.data);
                    storeQuestMap(response.data);

                    this.setState({
                        questMap: response.data,
                        playerHero: hero,
                        isLoading: false
                    });

                }
            })
            .catch(error => {
                this.handleError(error);
            })



        // data fetch is over, hide spinner
        hide();
    }

    extractPlayerHero() {
        let sessionUserId = getUserId();

        for (let i = 0; i < this.state.campaign.heroes.length; i++) {

            if (this.state.campaign.heroes[i].playedBy.userId === sessionUserId) {
                return this.state.campaign.heroes[i];
            }
        }
    }

    handleError(error) {
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
    }

    handleMoveButtonClick(event) {
        getMapFieldsInRange(this.state.playerHero.currentLocation, this.state.playerHero.movementPoints, "HEROES")
            .then(response => {
                if (response.data) {
                    console.log("REST response", response.data);

                    this.setState({
                        actionMode: "MOVE",
                        actionFunction: this.handleMoveMapClick,
                        mapFields: response.data
                    });
                }
            })
            .catch(error => {
                this.handleError(error);
            })
    }

    handleMoveMapClick(event) {
        let fieldName = event.target.getAttribute("fieldname");


        this.setState({
            actionMode: "",
            mapFields: null
        });
    }

    render() {
        if (this.state.redirect) {
            console.log("redirect to: ", this.state.redirect);
            return <Navigate replace to={this.state.redirect} />
        }

        if (this.state.isLoading) {
            return null;
        }

        return (
            // <div id="quest-container">
            //     <GameMap quest={this.state.activeQuest} map={this.state.questMap} />
            //     <div id="heroes"></div>
            //     <div id="monsters"></div>
            // </div>
            <div>
                <Container fluid>
                    <Row>
                        <Col>
                            <div className="quest-header">
                                {this.state.activeQuest.quest.name}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col><GameMap quest={this.state.activeQuest} fields={this.state.mapFields} mode={this.state.actionMode} actionFunction={this.state.actionFunction} /></Col>
                        <Col md="auto">
                            {this.state.playerHero != null &&
                                <Tabs defaultActiveKey="sheet" id="uncontrolled-tab-example">
                                    <Tab eventKey="sheet" title="Hero Sheet">
                                        <div className="tab-content-hero">
                                            <HeroSheet hero={this.state.playerHero} />
                                        </div>
                                    </Tab>
                                    <Tab eventKey="skills" title="Skills">
                                        <div className="tab-content-hero">

                                        </div>
                                    </Tab>
                                    <Tab eventKey="equip" title="Equipment">
                                        <div className="tab-content-hero">

                                        </div>
                                    </Tab>
                                    <Tab eventKey="inventory" title="Inventory" disabled>
                                        <div className="tab-content-hero">

                                        </div>
                                    </Tab>
                                </Tabs>
                            }
                            <div id="actions-hero">
                                <button onClick={this.handleMoveButtonClick}>Move</button>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <MessageBox />
                        </Col>
                        <Col></Col>
                        <Col></Col>
                    </Row>
                </Container>
            </div>
        );
    }
}