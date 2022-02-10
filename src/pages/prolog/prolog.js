import React from 'react';
import { Navigate } from "react-router-dom";
import * as Page from '../../route/redirects';

import { Container, Row, Col, Button } from 'react-bootstrap';
import Notification from 'cogo-toast';

import { isloggedin } from '../../services/Loginservice';
import { endSession, getCampaign, storeActiveQuest } from '../../services/LocalSessionService';
import { getQuestById } from '../../services/QuestService';

import './prolog.css';

export default class Prolog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeQuest: null,
            isLoading: true,
            redirect: ""
        }
    }

    componentDidMount() {
        isloggedin()
            .then((loggedIn) => {
                if (loggedIn) {
                    this.fetchQuestData();
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

    fetchQuestData() {
        let campaign = getCampaign();

        if (campaign === null) {
            Notification.info("Select campaign first");
            this.setState({
                redirect: Page.CAMPAIGNSELECTION
            });
            return
        }
        getQuestById(campaign.activeQuestId)
            .then((response) => {
                console.log("Response data: ", response.data);
                storeActiveQuest(response.data);
                this.setState({
                    activeQuest: response.data,
                    isLoading: false
                });

            })
            .catch((error) => {
                this.handleError(error);
            });
    }

    handleClick() {
        this.setState({
            redirect: Page.QUEST
        });
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

    render() {
        if (this.state.redirect) {
            console.log("redirect to: ", this.state.redirect);
            return <Navigate replace to={this.state.redirect} state={{ quest: this.state.activeQuest }} />
        }

        if (this.state.isLoading) {
            return null;
        }

        return (
            <div className="prologcover">
                <Container fluid>
                    <Row>
                        <Col>
                            <div className="header">
                                {(this.state.activeQuest != null) &&
                                    <div>{this.state.activeQuest.quest.name}</div>
                                }
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div id="vertical-align-text">
                                {(this.state.activeQuest != null) &&
                                    <div id="text-box">{this.state.activeQuest.prolog.text}</div>
                                }
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="footer">
                                <Button onClick={this.handleClick.bind(this)}
                                    className="navButton" as="input" type="button" value="Continue" />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}