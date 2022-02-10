import { get, post } from './base';
import { getSessionToken, getCampaignId, getUsername } from './LocalSessionService';

export async function getCampaignMessages() {
    const authToken = getSessionToken();
    const campaignId = getCampaignId();
    console.log("Calling: GET /messages?campaignId=" + campaignId);

    return await get("/messages", { headers: { 'Authentication': 'Bearer ' + authToken }, params: { campaignId: campaignId } });
}

export async function newPlayerMessage(messageText) {
    const authToken = getSessionToken();
    const campaignId = getCampaignId();
    const name = getUsername();
    const message = {
        type: "PLAYER",
        campaignId: campaignId,
        username: name,
        text: messageText
    }
    console.log("Calling: POST /messages");

    return await post("/messages", message, { headers: { 'Authentication': 'Bearer ' + authToken } });
}

export async function newGameMessage(messageText) {
    const authToken = getSessionToken();
    const campaignId = getCampaignId();

    const message = {
        type: "GAME",
        campaignId: campaignId,
        text: messageText
    }
    console.log("Calling: POST /messages");

    return await post("/messages", message, { headers: { 'Authentication': 'Bearer ' + authToken } });
}