import * as React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { getHeroTokenImageByKey } from '../../../services/ImageService';

import './GameHero.css';

export default class GameHero extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            hero: this.props.hero
        }
    }

    render() {

        const FIELD_SIZE = 64;
        let cssTop = this.state.hero.currentLocation[0].yPos * FIELD_SIZE;
        let cssLeft = this.state.hero.currentLocation[0].xPos * FIELD_SIZE;

        return (
            <div style={{ width: FIELD_SIZE, height: FIELD_SIZE, position: 'absolute', top: cssTop, left: cssLeft, 'zIndex': 400 }}>
                <OverlayTrigger overlay={<Tooltip id="tooltip-right">{this.state.hero.heroTemplate.fullName}</Tooltip>}>
                    <button
                        className={this.state.hero.active ? 'active-unit' : ''}
                        style={{ width: FIELD_SIZE, height: FIELD_SIZE, padding: 0, 'borderWidth': 0, 'borderRadius': 32 }}
                    >
                        <img alt="" src={getHeroTokenImageByKey("token_" + this.state.hero.heroTemplate.imageName)} />
                    </button>
                </OverlayTrigger>
            </div>
        );
    }
}