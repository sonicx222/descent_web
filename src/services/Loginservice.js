import { post, del } from './base';
import { getSessionToken } from './Sessionservice';

export function authenticate(requestData) {
    return post("/sessions", requestData);
}

export function logout(id) {
    const authToken = getSessionToken();
    return del("/sessions/" + id, {headers: {'Authentication': 'Bearer ' + authToken}});
}