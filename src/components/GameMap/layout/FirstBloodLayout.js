import * as React from 'react';
import { getMapTileImageByKey } from '../../../services/ImageService';

import './FirstBloodLayout.css';

const FirstBloodLayout = () => (
    <div>
        <div id="tiles">
            <div id="A8">
                <img alt="" src={getMapTileImageByKey("A8")} />
            </div>
            <div id="endA1">
                <img alt="" src={getMapTileImageByKey("ENDA")} />
            </div>
            <div id="A16">
                <img alt="" src={getMapTileImageByKey("A16")} />
            </div>
            <div id="A12">
                <img alt="" src={getMapTileImageByKey("A12")} />
            </div>
            <div id="exitA">
                <img alt="" src={getMapTileImageByKey("EXITA")} />
            </div>
            <div id="A26">
                <img alt="" src={getMapTileImageByKey("A26")} />
            </div>
            <div id="A9">
                <img alt="" src={getMapTileImageByKey("A9")} />
            </div>
            <div id="endA2">
                <img alt="" src={getMapTileImageByKey("ENDA")} />
            </div>
            <div id="entranceA">
                <img alt="" src={getMapTileImageByKey("ENTRANCEA")} />
            </div>
            <div id="endA3">
                <img alt="" src={getMapTileImageByKey("ENDA")} />
            </div>
        </div>
        <div id="grid-label">
            <div
                style={{ position: 'absolute', left: 64, top: 0 }}>A</div>
            <div
                style={{ position: 'absolute', left: 128, top: 0 }}>B</div>
            <div
                style={{ position: 'absolute', left: 192, top: 0 }}>C</div>
            <div
                style={{ position: 'absolute', left: 256, top: 0 }}>D</div>
            <div
                style={{ position: 'absolute', left: 320, top: 0 }}>E</div>
            <div
                style={{ position: 'absolute', left: 384, top: 0 }}>F</div>
            <div
                style={{ position: 'absolute', left: 448, top: 0 }}>G</div>
            <div
                style={{ position: 'absolute', left: 512, top: 0 }}>H</div>
            <div
                style={{ position: 'absolute', left: 576, top: 0 }}>I</div>
            <div
                style={{ position: 'absolute', left: 640, top: 0 }}>J</div>
            <div
                style={{ position: 'absolute', left: 704, top: 0 }}>K</div>
            <div
                style={{ position: 'absolute', left: 768, top: 0 }}>L</div>
            <div
                style={{ position: 'absolute', left: 832, top: 0 }}>M</div>
            <div
                style={{ position: 'absolute', left: 0, top: 64 }}>0</div>
            <div
                style={{ position: 'absolute', left: 0, top: 128 }}>1</div>
            <div
                style={{ position: 'absolute', left: 0, top: 192 }}>2</div>
            <div
                style={{ position: 'absolute', left: 0, top: 256 }}>3</div>
            <div
                style={{ position: 'absolute', left: 0, top: 320 }}>4</div>
            <div
                style={{ position: 'absolute', left: 0, top: 384 }}>5</div>
            <div
                style={{ position: 'absolute', left: 0, top: 448 }}>6</div>
            <div
                style={{ position: 'absolute', left: 0, top: 512 }}>7</div>
            <div
                style={{ position: 'absolute', left: 0, top: 576 }}>8</div>
            <div
                style={{ position: 'absolute', left: 0, top: 640 }}>9</div>
            <div
                style={{ position: 'absolute', left: 0, top: 704 }}>10</div>
            <div
                style={{ position: 'absolute', left: 0, top: 768 }}>11</div>
        </div>
    </div>
);

export default FirstBloodLayout;