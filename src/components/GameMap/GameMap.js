import * as React from 'react';

import FirstBloodLayout from './layout/FirstBloodLayout';
import MapField from './field/MapField';
import GameHero from './hero/GameHero';
import GameMonster from './monster/GameMonster';

import './GameMap.css';
import { getCampaign } from '../../services/LocalSessionService';

export default class GameMap extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            campaign: getCampaign(),
            quest: this.props.quest,
            mapFields: this.props.fields,
            gameMapFields: null,
            mapHeroes: null,
            mapMonsters: null,
            redirect: ""
        }
    }


    componentDidMount() {
        this.createMapFields();
        this.createHeroes();
        this.createMonsters();
    }

    componentDidUpdate() {
        console.log("componentDidUpdate");

        this.createMapFields();
        // this.createHeroes();
        // this.createMonsters();
    }

    createMapFields() {
        let divFields = [];
        let classNames = "";

        if (this.props.fields != null && this.props.fields.length > 0) {

            if (this.props.mode === 'MOVE') {
                classNames = "map-field move";
            }

            for (let i = 0; i < this.props.fields.length; i++) {
                divFields.push(
                    <MapField key={this.props.fields[i].name} field={this.props.fields[i]} cssClass={classNames} onClickAction={this.props.actionFunction} />
                );
            }

            // this.setState({
            //     gameMapFields: divFields
            // });
        }

        return divFields;
    }

    createHeroes() {
        let heroes = [];

        if (this.state.campaign.heroes.length > 0) {
            for (let i = 0; i < this.state.campaign.heroes.length; i++) {
                heroes.push(
                    <GameHero key={this.state.campaign.heroes[i].playedBy.userId} hero={this.state.campaign.heroes[i]} />
                );
            }

            this.setState({
                mapHeroes: heroes
            });
        }
    }

    createMonsters() {
        let monsters = [];

        if (this.state.quest.monsters.length > 0) {
            for (let i = 0; i < this.state.quest.monsters.length; i++) {
                monsters.push(
                    <GameMonster key={this.state.quest.monsters[i].currentLocation[0].name} monster={this.state.quest.monsters[i]} />
                );
            }

            this.setState({
                mapMonsters: monsters
            });
        }
    }

    render() {
        const mapFields = this.createMapFields();

        return (
            <div className="map-area">
                <div id="map-container">
                    <div id="map-layout">
                        <FirstBloodLayout />
                    </div>
                    <div id="map-content">
                    {(mapFields != null) &&
                            mapFields
                        }
                        {/* {(this.state.gameMapFields != null) &&
                            this.state.gameMapFields
                        } */}
                        {(this.state.mapHeroes != null) &&
                            this.state.mapHeroes
                        }
                        {(this.state.mapMonsters != null) &&
                            this.state.mapMonsters
                        }
                        {/* <div id="map-fields">
                            {(this.state.mapFields != null) &&
                                this.state.mapFields
                            }
                        </div> */}
                        {/* <div id="map-units">
                            {(this.state.mapHeroes != null) &&
                                this.state.mapHeroes
                            }
                            {(this.state.mapMonsters != null) &&
                                this.state.mapMonsters
                            }
                        </div> */}
                    </div>
                </div>
            </div>
        );
    }
}