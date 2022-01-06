import grisban from '../assets/img/heroes/Grisban_the_thirsty.png';
import syndrael from '../assets/img/heroes/Syndrael.png';
import jain_fairwood from '../assets/img/heroes/JainFairwood.png';
import tomble_burrowell from '../assets/img/heroes/Tomble_Burrowell.png';
import ashrian from '../assets/img/heroes/Ashrian.png';
import avric_albright from '../assets/img/heroes/AvricAlbright.png';
import widow_tarha from '../assets/img/heroes/WidowTarha.png';
import leoric from '../assets/img/heroes/Leoric_of_the_Book.png';

const images = {
    grisban,
    syndrael,
    jain_fairwood,
    tomble_burrowell,
    ashrian,
    avric_albright,
    widow_tarha,
    leoric
};

export default function getImageByKey(key) {
    return images[key];
}