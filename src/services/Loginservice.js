import { get, post, del } from './base';
import { getSessionToken } from './LocalSessionService';

export function authenticate(requestData) {
    console.log("Calling: POST /sessions/");
    
    return post("/sessions", requestData);
}

export async function isloggedin() {
    let authToken = getSessionToken();
    if (authToken === null) {
        console.error("authToken is null!");
        return false;
    }
    console.log("Calling: GET /sessions/" + authToken + "/isloggedin");

    try {
        let result = (await get("/sessions/" + authToken + "/isloggedin")).data;
        // console.log("Result isLoggedIn(): ", result);
        return result;
    }
    catch (err) {
        console.log(err);
    }
}

export async function logout() {
    let authToken = getSessionToken();
    console.log("Calling: DELETE /sessions/" + authToken);

    return await del("/sessions/" + authToken, { headers: { 'Authentication': 'Bearer ' + authToken } });
}