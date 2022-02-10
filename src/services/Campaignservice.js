import { post, get, del } from './base';
import { getSessionToken, getCampaignId } from './LocalSessionService';

export async function newCampaign(requestData) {
    const authToken = getSessionToken();
    console.log("Calling: POST /campaigns");

    return await post("/campaigns", requestData, { headers: { 'Authentication': 'Bearer ' + authToken } });
}

export async function startCampaign(requestData) {
    const authToken = getSessionToken();
    const campaignId = getCampaignId();
    console.log("Calling: POST /campaigns/" + campaignId + "/start");

    return await post("/campaigns/" + campaignId + "/start", requestData, { headers: { 'Authentication': 'Bearer ' + authToken } });
}

export async function getCurrentCampaigns() {
    const authToken = getSessionToken();
    console.log("Calling: GET /campaigns");

    return await get("/campaigns/", { headers: { 'Authentication': 'Bearer ' + authToken } });
}

export async function getHeroSelections() {
    const campaignId = getCampaignId();
    const authToken = getSessionToken();
    console.log("Calling: GET /campaigns/" + campaignId + "/heroselections");

    return await get("/campaigns/" + campaignId + "/heroselections", { headers: { 'Authentication': 'Bearer ' + authToken } });
}

export async function createHeroSelection(campaignId, requestData) {
    const authToken = getSessionToken();
    console.log("Calling: POST /campaigns/" + campaignId + "/heroselections");

    return await post("/campaigns/" + campaignId + "/heroselections", requestData, { headers: { 'Authentication': 'Bearer ' + authToken } });
}

export async function deleteHeroSelection(selectionId) {
    const campaignId = getCampaignId();
    const authToken = getSessionToken();
    console.log("Calling: DELETE /campaigns/" + campaignId + "/heroselections/" + selectionId);

    return await del("/campaigns/" + campaignId + "/heroselections/" + selectionId, { headers: { 'Authentication': 'Bearer ' + authToken } });
}