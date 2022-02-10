import { get } from './base';

export async function getHeroTemplates() {
    console.log("Calling: GET /heroes");
    return await get("/heroes");
}