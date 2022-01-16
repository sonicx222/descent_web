import { get } from './base';
import { getSessionToken } from './LocalSessionService';


export async function getQuestById(questId) {
    const authToken = getSessionToken();
    console.log("Calling: GET /quests/" + questId);

    return await get("/quests/" + questId, { headers: { 'Authentication': 'Bearer ' + authToken } });
}
