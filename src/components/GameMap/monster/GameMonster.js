import * as React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { getMonsterTokenImageByKey } from '../../../services/ImageService';

import './GameMonster.css';

export default class GameMonster extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            monster: this.props.monster
        }
    }

    render() {

        // big or small monster
        const FIELD_SIZE = this.state.monster.currentLocation.length > 1 ? 128 : 64;
        let cssTop = this.state.monster.currentLocation[0].yPos * 64;
        let cssLeft = this.state.monster.currentLocation[0].xPos * 64;

        return (
            <div style={{ width: FIELD_SIZE, height: FIELD_SIZE, position: 'absolute', top: cssTop, left: cssLeft, 'zIndex': 400 }}>
                <OverlayTrigger overlay={<Tooltip id="tooltip-right">{this.state.monster.name}</Tooltip>}>
                    <button
                        className={this.state.monster.active ? 'active-unit' : ''}
                        style={{ width: FIELD_SIZE, height: FIELD_SIZE, padding: 0, 'borderWidth': 0, 'borderRadius': (FIELD_SIZE / 2) }}
                    >
                        <img alt="" src={getMonsterTokenImageByKey("token_" + this.state.monster.monsterTemplate.imageName)} />
                    </button>
                </OverlayTrigger>
            </div>
        );
    }
}