import * as React from 'react';
import { Image } from 'react-bootstrap';
import getImageByKey from '../../services/ImageService';
import './SelectedHeroImage.css';

export default function SelectedHeroImage(props) {

    return (
        <div>
            <Image id="hero-img" src={getImageByKey(props.img)} />
        </div>
    );
}
