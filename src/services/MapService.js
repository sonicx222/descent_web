import { get, post } from './base';
import { getQuestMap, getSessionToken } from './LocalSessionService';


export async function getMapById(mapId) {
    const authToken = getSessionToken();
    console.log("Calling: GET /maps/" + mapId);

    return await get("/maps/" + mapId, { headers: { 'Authentication': 'Bearer ' + authToken } });
}

export async function getMapFieldsInRange(rootFields, radius, side) {
    const authToken = getSessionToken();
    const map = getQuestMap();

    console.log("Calling: POST /maps/" + map.id + "/inrange?radius=" + radius + "&side=" + side);

    return await post(
        "/maps/" + map.id + "/inrange",
        rootFields,
        { headers: { 'Authentication': 'Bearer ' + authToken }, params: { radius: radius, side: side } }
    );
}
