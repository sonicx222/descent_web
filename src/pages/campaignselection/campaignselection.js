import React from 'react';
import { Navigate } from "react-router-dom";
import * as Page from '../../route/redirects';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import Notification from 'cogo-toast';

import { isloggedin } from '../../services/Loginservice';
import { endSession } from "../../services/LocalSessionService";
import { storeCampaign } from '../../services/LocalSessionService';
import { getCurrentCampaigns } from '../../services/Campaignservice';

import './campaignselection.css'

export default class CampaignSelection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            campaigns: [],
            campaignLookup: [],
            selectedCampaign: {},
            tableRows: [],
            isLoading: true,
            redirect: ""
        }
    }

    componentDidMount() {
        isloggedin()
            .then((loggedIn) => {
                if (loggedIn) {
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

        // load current campaigns
        console.log("Load active campaigns");
        getCurrentCampaigns()
            .then(response => {
                if (response.data) {
                    console.log("Response: ", response.data);
                    this.setState({
                        campaigns: response.data,
                        isLoading: false
                    });
                    this.createLookup(response.data);
                    this.createTableContent(response.data);
                }
            })
            .catch(error => {
                if (error.response) {
                    console.log(error.response);
                    Notification.error(error.response.status + " : " + error.response.statusText);
                } else {
                    console.log(error);
                    Notification.error("Something went terribly wrong!");
                }
            })

        // data fetch is over, hide spinner
        hide();
    }

    createLookup(campaigns) {
        let lookup = {};

        if (campaigns.length > 0) {
            for (let i = 0; i < campaigns.length; i++) {
                lookup[campaigns[i].name] = campaigns[i];
            }

            this.setState({
                campaignLookup: lookup
            });
        }
    }

    createTableContent(campaigns) {
        let rows = [];

        if (campaigns.length > 0) {
            for (let i = 0; i < campaigns.length; i++) {
                let campaign = campaigns[i];

                rows.push(
                    <tr key={campaign.name}>
                        <td>{campaign.name}</td>
                        <td>{campaign.overlord.playedBy.username}</td>
                        <td>{campaign.numberOfHeroes}</td>
                        <td>{campaign.phase}</td>
                        <td>{campaign.activeQuestEncounter ? campaign.activeQuestEncounter.quest.name : null}</td>
                        <td>{campaign.activeQuestEncounter ? campaign.activeQuestEncounter.questPart : null}</td>
                        <td><Button onClick={this.handleSelection.bind(this)}
                            name={campaign.name}
                            value="Select"
                            className="navButton" as="input" type="button" />
                        </td>
                    </tr>
                );
            }
            this.setState({
                tableRows: rows
            });
        }

    }

    handleSelection(event) {
        let campaign = this.state.campaignLookup[event.target.name];
        let newpage = "";

        // store in session
        storeCampaign(campaign);

        // trigger redirect
        if (campaign.phase === 'HERO_SELECTION') {
            newpage = Page.HEROSELECTION;
        } else if (campaign.phase === 'ENCOUNTER') {
            newpage = Page.PROLOG;
        }

        this.setState({
            redirect: newpage
        });
    }

    handleBackButtonClick() {
        this.setState({
            redirect: Page.START
        });
    }

    handleRefreshButtonClick() {
        this.fetchData();
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
            <div className="campaignselectioncover">
                <Container fluid>
                    <Row><Col id="flex-center-title">Select Campaign</Col></Row>
                    <Row>
                        <Col>
                            <div className="vertical-align ">
                                <Table striped bordered variant="dark">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Overlord</th>
                                            <th>Heroes</th>
                                            <th>Phase</th>
                                            <th>Active Quest</th>
                                            <th>Quest Part</th>
                                            <th>Choose</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.tableRows}
                                    </tbody>
                                </Table>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button onClick={this.handleBackButtonClick.bind(this)}
                                className="navButton" as="input" type="button" value="Back to Start" />
                        </Col>
                        <Col>
                            <Button onClick={this.handleRefreshButtonClick.bind(this)}
                                className="navButton" as="input" type="button" value="Refresh" />
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
