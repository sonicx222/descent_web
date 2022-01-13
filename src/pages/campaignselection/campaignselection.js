import React from 'react';
import { Navigate } from "react-router-dom";
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
        console.log("checkLoggedIn");
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
                        redirect: "/login"
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
                    console.log("Response GET /campaigns:", response.data);
                    this.setState({
                        campaigns: response.data,
                        isLoading: false
                    });
                    this.createLookup(response.data);
                    this.createTableContent();
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
        console.log("Calling createLookup()...", campaigns);
        let lookup = {};

        if (campaigns.length > 0) {
            for (let i = 0; i < campaigns.length; i++) {
                lookup[campaigns[i].name] = campaigns[i];
            }
            console.log("Campaign Lookup finished:", lookup);
            this.setState({
                campaignLookup: lookup
            });
        }
    }

    createTableContent() {
        console.log("Calling createTableContent()...");
        let rows = [];
        let players = 0;

        if (this.state.campaigns.length > 0) {
            for (let i = 0; i < this.state.campaigns.length; i++) {
                let campaign = this.state.campaigns[i];

                // prepare player count
                if (campaign.phase === 'HERO_SELECTION' && campaign.heroselections != null) {
                    players = players + campaign.heroselections.length;
                } else if (campaign.heroes != null) {
                    players = players + campaign.heroes.length;
                }

                rows.push(
                    <tr key={campaign.name}>
                        <td>{campaign.name}</td>
                        <td>{campaign.overlord.playedBy.username}</td>
                        <td>{campaign.heroSelections.length}</td>
                        <td>{campaign.phase}</td>
                        <td>{campaign.activeQuest}</td>
                        <td></td>
                        <td><Button onClick={this.handleSelection.bind(this)}
                            name={campaign.name}
                            value="Select"
                            className="navButton" as="input" type="button" /></td>
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

        // store in session
        storeCampaign(campaign);

        // trigger redirect
        this.setState({
            redirect: "/heroselection"
        });
    }

    handleBackButtonClick() {
        this.setState({
            redirect: "/start"
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
                                            <th>Players</th>
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
