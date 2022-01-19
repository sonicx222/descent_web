import * as React from 'react';
import FirstBloodLayout from './FirstBlood/FirstBloodLayout';

import './GameMap.css';

export default class GameMap extends React.Component {

    constructor(props) {
        // props: map={activeQuest.map}
        super(props);
    }


    render() {

        return (
            <div id="map-container">
                <div id="map-layout">
                    <FirstBloodLayout />
                </div>
                <div id="map-content">
          
                </div>
            </div>
        );
    }
}