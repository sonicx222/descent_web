import { post } from './base';
import { getSessionToken } from './LocalSessionService';

export function newCampaign(requestData) {
    console.log('requestData: ', requestData);
    const authToken = getSessionToken();
    console.log('authToken: ', authToken);
    
    return post("/campaigns", requestData, {headers: {'Authentication': 'Bearer ' + authToken}});
}
