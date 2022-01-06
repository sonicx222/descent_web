import { get } from './base';

export function getHeroTemplates() {
    return get("/heroes");
}