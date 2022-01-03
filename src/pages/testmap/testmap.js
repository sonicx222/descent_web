import * as React from "react";
import './testmap.css';
import A8 from './images/map_tiles/8A.png';
import endA from './images/map_tiles/endA.png';
import exitA from './images/map_tiles/exitA.png';
import A16 from './images/map_tiles/16A.png';
import A12 from './images/map_tiles/12A.png';
import A26 from './images/map_tiles/26A.png';
import A9 from './images/map_tiles/9A.png';
import entranceA from './images/map_tiles/entranceA.png';

export default function Testmap() {
    return (
        <div className="backgroundmap">
            <div className="map">
                <div id="A8">
                    <img src={A8} />
                </div>
                <div id="endA1">
                    <img src={endA} />
                </div>
                <div id="A16">
                    <img src={A16} />
                </div>
                <div id="A12">
                    <img src={A12} />
                </div>
                <div id="exitA">
                    <img src={exitA} />
                </div>
                <div id="A26">
                    <img src={A26} />
                </div>
                <div id="A9">
                    <img src={A9} />
                </div>
                <div id="endA2">
                    <img src={endA} />
                </div>
                <div id="entranceA">
                    <img src={entranceA} />
                </div>
                <div id="endA3">
                    <img src={endA} />
                </div>
            </div>
            <div class="grid">
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
}