import * as React from "react";
import { Image } from 'react-bootstrap';

import { getHeroSheetImageByKey, getHeroImageByKey } from '../../services/ImageService';

import './HeroSheet.css';

const HeroSheet = (props) => (
    
    <div className="hero-sheet">
        <Image src={getHeroSheetImageByKey(props.hero ? props.hero.heroTemplate.archetype : props.template.archetype)} />

        <div >
            <Image id="hero-image" src={getHeroImageByKey(props.hero ? props.hero.heroTemplate.imageName : props.template.imageName)} />
        </div>
        <div id="hero-archetype">
            {props.hero ? props.hero.heroTemplate.archetype : props.template.archetype}
        </div>
        <div id="hero-might">
            {props.hero ? props.hero.might : props.template.might}
        </div>
        <div id="hero-knowledge">
            {props.hero ? props.hero.knowledge : props.template.knowledge}
        </div>
        <div id="hero-willpower">
            {props.hero ? props.hero.willpower : props.template.willpower}
        </div>
        <div id="hero-awareness">
            {props.hero ? props.hero.awareness : props.template.awareness}
        </div>
        <div id="hero-speed">
            {props.hero ? props.hero.movementPoints : props.template.speed}
        </div>
        <div id="hero-health">
            {props.hero ? props.hero.currentLife : props.template.health}
        </div>
        <div id="hero-stamina">
            {props.hero ? props.hero.stamina : props.template.stamina}
        </div>
        <div id="label-ability">
            Hero Ability
        </div>
        <div id="hero-ability">
            {props.hero ? props.hero.heroTemplate.heroAbilityText : props.template.heroAbilityText}
        </div>
        <div id="label-feat">
            Heroic Feat
        </div>
        <div id="hero-feat">
            {props.hero ? props.hero.heroTemplate.heroicFeatText : props.template.heroicFeatText}
        </div>
    </div>
);

export default HeroSheet;
