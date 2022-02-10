import React from 'react';
import { Navigate } from "react-router-dom";
import * as Page from '../../route/redirects';
import { Container, Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
import Notification from 'cogo-toast';
import HeroSheet from '../../components/HeroSheet/HeroSheet';
import MessageBox from '../../components/MessageBox/MessageBox';

import { isloggedin } from '../../services/Loginservice';
import { endSession, storeCampaign, getUserId, getUsername, getCampaignId, getOverlordName } from "../../services/LocalSessionService";
import { isUserOverlord } from '../../services/GameService';
import { getHeroTemplates } from '../../services/HeroService';
import { getHeroSelections, createHeroSelection, deleteHeroSelection, startCampaign } from '../../services/Campaignservice';
import { getHeroTokenImageByKey, getHeroSkillImageByKey, getItemImageByKey } from '../../services/ImageService';

import './heroselection.css';

export default class HeroSelection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            herotemplates: [],
            heroselections: [],
            herolookup: [],
            listItems: [],
            selectionCards: [],
            selectedHero: {},
            submittedSelection: null,
            isOverlord: isUserOverlord(),
            canStartCampaign: false,
            isLoading: true,
            redirect: ""
        }
    }

    handleSelection(event) {
        this.setState({
            selectedHero: this.state.herolookup[event.target.name]
        });
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

        // load templates to populate options
        getHeroTemplates()
            .then(response => {
                if (response.data) {
                    console.log("Response", response.data);
                    this.setState({
                        herotemplates: response.data,
                        isLoading: false
                    });
                    this.createSelectItems();
                }
            })
            .catch(error => {
                this.handleError(error);
            })

        // load current hero selections
        getHeroSelections()
            .then(response => {
                if (response.data) {
                    console.log("Response", response.data);
                    this.setState({
                        heroselections: response.data,
                        isLoading: false
                    });
                    this.createHeroCards(response.data);
                    this.initButtonState(response.data);
                }
            })
            .catch(error => {
                this.handleError(error);
            })

        // data fetch is over, hide spinner
        hide();
    }

    createSelectItems() {
        let items = [];
        let lookup = {};
        if (this.state.herotemplates.length > 0) {
            for (let i = 0; i < this.state.herotemplates.length; i++) {
                lookup[this.state.herotemplates[i].name] = this.state.herotemplates[i];

                items.push(
                    <div id="template-item">
                        <ListGroup.Item action onClick={this.handleSelection.bind(this)}
                            key={this.state.herotemplates[i].name}
                            eventKey={this.state.herotemplates[i].name}
                            name={this.state.herotemplates[i].name}>
                            {this.state.herotemplates[i].fullName}
                        </ListGroup.Item>
                    </div>
                );
            }
            this.setState({
                herolookup: lookup,
                listItems: items
            });

            // preset first hero
            if (Object.keys(this.state.selectedHero).length === 0) {
                this.setState({
                    selectedHero: lookup[this.state.herotemplates[0].name]
                });
            }
        }
    }

    initButtonState(heroselections) {
        if (heroselections.length > 0) {
            let currentUserId = getUserId();
            for (let i = 0; i < heroselections.length; i++) {
                // player has already made a previous selection
                if (heroselections[i].user.userId === currentUserId) {
                    this.setState({
                        submittedSelection: heroselections[i]
                    });
                }
            }
        } else {
            this.setState({
                submittedSelection: null
            });
        }
    }

    createHeroCards(heroselections) {
        let items = [];

        // create hero cards
        if (heroselections.length > 0) {
            for (let i = 0; i < heroselections.length; i++) {
                items.push(
                    <Card className="text-center" key={i}>
                        <Card.Header>{heroselections[i].user.username}</Card.Header>
                        <Card.Img variant="top" id="token-img"
                            src={getHeroTokenImageByKey("token_" + heroselections[i].selectedHero.imageName)}
                        />
                    </Card>
                );
            }
            this.setState({
                selectionCards: items
            });
        } else {
            this.setState({
                selectionCards: []
            });
        }
    }

    handleBackButtonClick() {
        this.setState({
            redirect: Page.START
        });
    }

    handleRefreshButtonClick() {
        this.fetchData();
    }

    handleSubmitSelectionClick(e) {
        if (this.state.selectedHero == null) {
            Notification.info("Please select a hero first.");
            return
        }

        let campaignId = getCampaignId();
        let userId = getUserId();
        console.log(userId);
        let name = getUsername();
        const requestData = {
            campaign: campaignId,
            user: {
                userId: userId,
                username: name
            },
            selectedHero: this.state.selectedHero.name,
            ready: true
        };

        console.log("Submitting selection:", this.state.selectedHero.name);
        let { hide } = Notification.loading("Waiting for Cloud service...", { hideAfter: 0 });
        createHeroSelection(campaignId, requestData)
            .then((response) => {
                hide();
                console.log("Response: ", response.data);
                this.setState({
                    submittedSelection: response.data
                });
                this.fetchData();
            })
            .catch((error) => {
                hide();
                this.handleError(error);
            });
        e.preventDefault();
    }

    handleUndoSelectionClick(e) {
        console.log("Undo selection:", this.state.submittedSelection);
        let { hide } = Notification.loading("Waiting for Cloud service...", { hideAfter: 0 });

        deleteHeroSelection(this.state.submittedSelection.id)
            .then((response) => {
                hide();
                console.log("Response data", response.data);
                this.setState({
                    submittedSelection: null
                });
                this.fetchData();
            })
            .catch((error) => {
                hide();
                this.handleError(error);
            });
    }

    handleStartClick() {
        console.log("handleStartClick");
        let { hide } = Notification.loading("Waiting for Cloud service...", { hideAfter: 0 });

        startCampaign()
            .then((response) => {
                hide();
                console.log("Response: ", response.status);
                // update current campaign object in session
                storeCampaign(response.data);

                this.setState({
                    redirect: Page.PROLOG
                });
            })
            .catch((error) => {
                hide();
                this.handleError(error);
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
            return <Navigate replace to={this.state.redirect} />
        }

        if (this.state.isLoading) {
            return null;
        }

        return (
            <div className="heroselectioncover">
                <Container fluid>
                    <Row>
                        <Col>
                            <div id="margin-box">
                                <div id="border-region">
                                    <div id="label">
                                        Overlord
                                    </div>
                                    <div className="selectioncards">
                                        <Card className="text-center" key={99}>
                                            <Card.Header>{getOverlordName()}</Card.Header>
                                            <Card.Img variant="top" id="token-img"
                                                src={getHeroTokenImageByKey("token_overlord")}
                                            />
                                        </Card>
                                    </div>
                                </div>
                                <div id="border-region">
                                    <div id="label">
                                        Current hero selections
                                    </div>
                                    <div className="selectioncards">
                                        {this.state.selectionCards}
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col>
                            <div id="border-region">
                                <div id="label">
                                    Messages
                                </div>
                                <MessageBox />
                            </div>
                        </Col>
                    </Row>
                    {!this.state.isOverlord && <Row>
                        <Col>
                            <div id="flex-column">
                                {this.state.herotemplates.length > 0 &&
                                    <div id="border-region">
                                        <div id="label">
                                            Select your hero
                                        </div>
                                        <div id="list-group-templates">
                                            <ListGroup defaultActiveKey={this.state.herotemplates[0].name}>
                                                {this.state.listItems}
                                            </ListGroup>
                                        </div>
                                    </div>
                                }
                                <div id="border-region">
                                    <HeroSheet template={this.state.selectedHero} />
                                </div>

                            </div>
                        </Col>
                        <Col>
                            <div id="flex-column">
                                {this.state.selectedHero != null &&
                                    <div id="border-region">
                                        <div id="label">
                                            Start skill
                                        </div>
                                        <div>
                                            <Image id="skill-img" src={getHeroSkillImageByKey(this.state.selectedHero.startSkill)} />
                                        </div>
                                    </div>
                                }
                                {this.state.selectedHero != null &&
                                    <div id="border-region">
                                        <div id="label">
                                            Start items
                                        </div>
                                        <div>
                                            <Image id="item-img" src={getItemImageByKey(this.state.selectedHero.startWeapon)} />{' '}
                                            <Image id="item-img" src={
                                                getItemImageByKey(this.state.selectedHero.startShield ? this.state.selectedHero.startShield : this.state.selectedHero.startTrinket)
                                            } />
                                        </div>
                                    </div>
                                }
                            </div>
                        </Col>
                    </Row>}
                    <Row>
                        <Col>
                            <Button onClick={this.handleBackButtonClick.bind(this)}
                                className="navButton" as="input" type="button" value="Back to Start" />
                        </Col>
                        <Col>
                            <Button onClick={this.handleRefreshButtonClick.bind(this)}
                                className="navButton" as="input" type="button" value="Refresh" />
                        </Col>
                        <Col>
                            {!this.state.isOverlord && (this.state.submittedSelection == null) &&
                                <Button onClick={this.handleSubmitSelectionClick.bind(this)}
                                    className="navButton" as="input" type="button" value="Confirm Selection" />
                            }
                            {!this.state.isOverlord && (this.state.submittedSelection != null) &&
                                <Button onClick={this.handleUndoSelectionClick.bind(this)}
                                    className="navButton" as="input" type="button" value="Undo Selection" />
                            }
                            {this.state.isOverlord &&
                                <Button onClick={this.handleStartClick.bind(this)}
                                    className="navButton" as="input" type="button" value="Start Campaign" />
                            }
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}