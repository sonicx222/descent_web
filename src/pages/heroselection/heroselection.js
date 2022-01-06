import React from 'react';
import { Navigate } from "react-router-dom";
import { Container, Row, Col, ListGroup, Image } from 'react-bootstrap';
import Notification from 'cogo-toast';
import SelectedHeroImage from '../../components/SelectedHeroImage/SelectedHeroImage';
import { isSessionActive } from '../../services/LocalSessionService';
import { getHeroTemplates } from '../../services/HeroService';
import HeroSheetImg from '../../assets/img/hero_sheet.png';

import './heroselection.css';

export default class HeroSelection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            herotemplates: [],
            herolookup: [],
            listItems: [],
            selectedHero: {},
            selectedHeroImg: "grisban",
            isLoading: true,
            redirect: ""
        }

        this.handleSelection = this.handleSelection.bind(this);
    }

    handleSelection(event) {
        this.setState({
            selectedHero: this.state.herolookup[event.target.name]
        });
    }

    componentDidMount() {
        console.log("heroselection:componentDidMount()");
        if (!isSessionActive) {
            console.log("Session has ended. Please login");
            Notification.info("Session has ended. Please login");
            this.setState({
                redirect: "/login"
            });
        } else {
            this.fetchHeroData();
        }
    }

    fetchHeroData() {
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
                if (error.response) {
                    console.log(error.response.data);
                    Notification.error(error.response.data.errorMessage);
                } else {
                    console.log(error);
                    Notification.error("Something went terribly wrong!");
                }
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
                        name={this.state.herotemplates[i].name}>
                        {this.state.herotemplates[i].name}
                    </ListGroup.Item>
                );
            }
            this.setState({
                selectedHero: lookup[this.state.herotemplates[0].name],
                herolookup: lookup,
                listItems: items
            });
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
            // <div className="heroselectionpage">
            <div className="heroselectioncover">
                <Container fluid>
                    <Row>
                        <Col>
                        <div id="symbol">
ABCDEFGHIJKLMNOP
abcdefghijk
                            </div>
                            </Col>
                        <Col>2 of 2{this.state.selectedHero.name}</Col>
                    </Row>
                    <Row>
                        <Col>1 of 3
                            {this.state.herotemplates.length > 0 &&
                                <div id="heroselection-region">
                                    <ListGroup>
                                        {this.state.listItems}
                                    </ListGroup>
                                    {/* <ListGroup>
                                                {this.state.herotemplates.map(item => (
                                                    <ListGroup.Item action >{item.name}</ListGroup.Item>
                                                ))}
                                            </ListGroup> */}
                                </div>
                            }
                        </Col>
                        <Col>
                            <div className="hero-preview">
                                <Image src={HeroSheetImg} />

                                <div id="hero-image">
                                    <SelectedHeroImage img={this.state.selectedHero.imageName} />
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
                        </Col>
                        <Col>3 of 3</Col>
                    </Row>
                    <Row>
                        <Col>1 of 3</Col>
                        <Col>2 of 3</Col>
                        <Col>3 of 3</Col>
                    </Row>
                </Container>
            </div>
            // </div>
        );

    }
}