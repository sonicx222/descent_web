// hero images
import grisban from '../assets/img/heroes/Grisban_the_thirsty.png';
import syndrael from '../assets/img/heroes/Syndrael.png';
import jain_fairwood from '../assets/img/heroes/JainFairwood.png';
import tomble_burrowell from '../assets/img/heroes/Tomble_Burrowell.png';
import ashrian from '../assets/img/heroes/Ashrian.png';
import avric_albright from '../assets/img/heroes/AvricAlbright.png';
import widow_tarha from '../assets/img/heroes/WidowTarha.png';
import leoric from '../assets/img/heroes/Leoric_of_the_Book.png';

// hero token images
import token_overlord from '../assets/img/heroes/tokens/overlord.png';
import token_grisban from '../assets/img/heroes/tokens/grisban_the_thirsty.png';
import token_syndrael from '../assets/img/heroes/tokens/syndrael.png';
import token_jain_fairwood from '../assets/img/heroes/tokens/jain_fairwood.png';
import token_tomble_burrowell from '../assets/img/heroes/tokens/tomble_burrowell.png';
import token_ashrian from '../assets/img/heroes/tokens/ashrian.png';
import token_avric_albright from '../assets/img/heroes/tokens/avric_albright.png';
import token_widow_tarha from '../assets/img/heroes/tokens/widow_tarha.png';
import token_leoric from '../assets/img/heroes/tokens/leoric_of_the_book.png';

// hero archetype sheet images
import WARRIOR from '../assets/img/layout/hero_sheet_warrior.png';
import HEALER from '../assets/img/layout/hero_sheet_healer.png';
import MAGE from '../assets/img/layout/hero_sheet_mage.png';
import SCOUT from '../assets/img/layout/hero_sheet_scout.png';

// hero skill images
import START_WARRIOR_BERSERKER from '../assets/img/skills/0_warrior_berserker_rage.png';
import START_WARRIOR_KNIGHT from '../assets/img/skills/0_warrior_knight_oath_of_honor.png';
import START_SCOUT_WILDLANDER from '../assets/img/skills/0_scout_wildlander_nimble.png';
import START_SCOUT_THIEF from '../assets/img/skills/0_scout_thief_greedy.png';
import START_HEALER_SPIRITSPEAKER from '../assets/img/skills/0_healer_spiritspeaker_stoneskin.png';
import START_HEALER_DISCIPLE from '../assets/img/skills/0_healer_disciple_prayer_of_healing.png';
import START_MAGE_NECROMANCER from '../assets/img/skills/0_mage_necromancer_raise_dead.png';
import START_MAGE_RUNEMASTER from '../assets/img/skills/0_mage_runemaster_runic_knowledge.png';

// item images
import START_BERSERKER_WEAPON from '../assets/img/items/warrior_berserker_axe.png';
import START_KNIGHT_WEAPON from '../assets/img/items/warrior_knight_blade.png';
import START_KNIGHT_SHIELD from '../assets/img/items/warrior_knight_shield.png';
import START_WILDLANDER_WEAPON from '../assets/img/items/scout_wildlander_bow.png';
import START_THIEF_WEAPON from '../assets/img/items/scout_thief_blade.png';
import START_THIEF_TRINKET from '../assets/img/items/scout_thief_trinket.png';
import START_SPIRITSPEAKER_WEAPON from '../assets/img/items/healer_spiritspeaker_staff.png';
import START_DISCIPLE_WEAPON from '../assets/img/items/healer_disciple_hammer.png';
import START_DISCIPLE_SHIELD from '../assets/img/items/healer_disciple_shield.png';
import START_NECROMANCER_WEAPON from '../assets/img/items/mage_necromancer_staff.png';
import START_RUNEMASTER_WEAPON from '../assets/img/items/mage_runemaster_rune.png';


const heroImages = {
    grisban,
    syndrael,
    jain_fairwood,
    tomble_burrowell,
    ashrian,
    avric_albright,
    widow_tarha,
    leoric
};

const heroTokenImages = {
    token_overlord,
    token_grisban,
    token_syndrael,
    token_jain_fairwood,
    token_tomble_burrowell,
    token_ashrian,
    token_avric_albright,
    token_widow_tarha,
    token_leoric
}

const heroSheetImages = {
    WARRIOR,
    HEALER,
    MAGE,
    SCOUT
};

const heroSkillImages = {
    START_WARRIOR_BERSERKER,
    START_WARRIOR_KNIGHT,
    START_SCOUT_WILDLANDER,
    START_SCOUT_THIEF,
    START_HEALER_SPIRITSPEAKER,
    START_HEALER_DISCIPLE,
    START_MAGE_NECROMANCER,
    START_MAGE_RUNEMASTER
};

const itemImages = {
    START_BERSERKER_WEAPON,
    START_KNIGHT_WEAPON,
    START_KNIGHT_SHIELD,
    START_WILDLANDER_WEAPON,
    START_THIEF_WEAPON,
    START_THIEF_TRINKET,
    START_SPIRITSPEAKER_WEAPON,
    START_DISCIPLE_WEAPON,
    START_DISCIPLE_SHIELD,
    START_NECROMANCER_WEAPON,
    START_RUNEMASTER_WEAPON
};



export function getHeroImageByKey(key) {
    return heroImages[key];
}

export function getHeroTokenImageByKey(key) {
    return heroTokenImages[key];
}

export function getHeroSheetImageByKey(key) {
    return heroSheetImages[key];
}

export function getHeroSkillImageByKey(key) {
    return heroSkillImages[key];
}

export function getItemImageByKey(key) {
    return itemImages[key];
}