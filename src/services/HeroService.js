import { get } from './base';

export async function getHeroTemplates() {
    return await get("/heroes");
}