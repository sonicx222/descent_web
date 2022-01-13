import React from 'react';
import { Navigate } from "react-router-dom";
import { Container, Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
import Notification from 'cogo-toast';

import { isloggedin } from '../../services/Loginservice';
import { endSession, getUserId, getUsername, getCampaignId, getOverlordName } from "../../services/LocalSessionService";
import { isUserOverlord } from '../../services/GameService';
import { getHeroTemplates } from '../../services/HeroService';
import { getHeroSelections, createHeroSelection, deleteHeroSelection } from '../../services/Campaignservice';
import { getHeroSheetImageByKey, getHeroImageByKey, getHeroTokenImageByKey, getHeroSkillImageByKey, getItemImageByKey } from '../../services/ImageService';

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
            submittedSelection: {},
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
        console.log("componentDidMount(): checkLoggedIn");
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

        // load templates to populate options
        console.log("Load hero templates");
        getHeroTemplates()
            .then(response => {
                if (response.data) {
                    console.log("REST response", response.data);
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
        console.log("Load hero selections");
        getHeroSelections()
            .then(response => {
                if (response.data) {
                    console.log("REST response", response.data);
                    this.setState({
                        heroselections: response.data,
                        isLoading: false
                    });
                    this.createHeroCards();
                }
            })
            .catch(error => {
                this.handleError(error);
            })

        // data fetch is over, hide spinner
        hide();
    }

    createSelectItems() {
        console.log("Calling createSelectItems()...");
        let items = [];
        let lookup = {};
        if (this.state.herotemplates.length > 0) {
            for (let i = 0; i < this.state.herotemplates.length; i++) {
                lookup[this.state.herotemplates[i].name] = this.state.herotemplates[i];

                items.push(
                    <ListGroup.Item action onClick={this.handleSelection.bind(this)}
                        key={this.state.herotemplates[i].name}
                        eventKey={this.state.herotemplates[i].name}
                        name={this.state.herotemplates[i].name}>
                        {this.state.herotemplates[i].fullName}
                    </ListGroup.Item>
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

    createHeroCards() {
        console.log("Calling createHeroCards()...");
        let items = [];

        // create hero cards
        if (this.state.heroselections.length > 0) {
            for (let i = 0; i < this.state.heroselections.length; i++) {
                items.push(
                    <Card className="text-center" key={i}>
                        <Card.Header>{this.state.heroselections[i].user.username}</Card.Header>
                        <Card.Img variant="top" id="token-img"
                            src={getHeroTokenImageByKey("token_" + this.state.heroselections[i].selectedHero.imageName)}
                        />
                        {/* <Card.Footer className="text-muted">{this.state.heroselections[i].selectedHero.fullName}</Card.Footer> */}
                        {/* <Card.Footer className="text-muted"
                            id={this.state.heroselections[i].ready ? "ready" : "not-ready"}
                        /> */}
                    </Card>
                );
            }
            this.setState({
                selectionCards: items
            });
        }
    }

    handleBackButtonClick() {
        this.setState({
            redirect: "/start"
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
                console.log("Response data", response.data);
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

    handleStartClick() {

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
                                        Current hero selection
                                    </div>
                                    <div className="selectioncards">
                                        {this.state.selectionCards}
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col>Is Overlord: {this.state.isOverlord ? "Overlord!" : "Hero"}</Col>
                    </Row>
                    {!this.state.isOverlord && <Row>
                        <Col>
                            <div id="flex-column">
                                {this.state.herotemplates.length > 0 &&
                                    <div id="border-region">
                                        <div id="label">
                                            Select your hero
                                        </div>
                                        <ListGroup defaultActiveKey={this.state.herotemplates[0].name}>
                                            {this.state.listItems}
                                        </ListGroup>
                                    </div>
                                }
                                <div className="hero-preview">
                                    <Image src={getHeroSheetImageByKey(this.state.selectedHero.archetype)} />

                                    <div >
                                        <Image id="hero-image" src={getHeroImageByKey(this.state.selectedHero.imageName)} />
                                    </div>
                                    <div id="hero-archetype">
                                        {this.state.selectedHero.archetype}
                                    </div>
                                    <div id="hero-might">
                                        {this.state.selectedHero.might}
                                    </div>
                                    <div id="hero-knowledge">
                                        {this.state.selectedHero.knowledge}
                                    </div>
                                    <div id="hero-willpower">
                                        {this.state.selectedHero.willpower}
                                    </div>
                                    <div id="hero-awareness">
                                        {this.state.selectedHero.awareness}
                                    </div>
                                    <div id="hero-speed">
                                        {this.state.selectedHero.speed}
                                    </div>
                                    <div id="hero-health">
                                        {this.state.selectedHero.health}
                                    </div>
                                    <div id="hero-stamina">
                                        {this.state.selectedHero.stamina}
                                    </div>
                                    <div id="label-ability">
                                        Hero Ability
                                    </div>
                                    <div id="hero-ability">
                                        {this.state.selectedHero.heroAbilityText}
                                    </div>
                                    <div id="label-feat">
                                        Heroic Feat
                                    </div>
                                    <div id="hero-feat">
                                        {this.state.selectedHero.heroicFeatText}
                                    </div>
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
                            {!this.state.isOverlord &&
                                <Button onClick={this.handleSubmitSelectionClick.bind(this)}
                                    className="navButton" as="input" type="button" value="Confirm Selection" />
                            }
                            {this.state.isOverlord &&
                                <Button onClick={this.handleStartClick.bind(this)}
                                    className="navButton" as="input" deactive={!this.state.canStartCampaign} type="button" value="Start Campaign" />
                            }
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}