import { post, del } from './base';
import { getSessionToken } from './LocalSessionService';

export function authenticate(requestData) {
    return post("/sessions", requestData);
}

export function logout() {
    const authToken = getSessionToken();
    return del("/sessions/" + authToken, {headers: {'Authentication': 'Bearer ' + authToken}});
}