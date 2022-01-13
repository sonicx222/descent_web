export function storeSession(data) {
    sessionStorage.setItem('sessionData', JSON.stringify(data));
}

export function storeCampaign(data) {
    sessionStorage.setItem('currentCampaign', JSON.stringify(data));
}

export function storeCurrentSelection(data) {
    sessionStorage.setItem('currentSelection', JSON.stringify(data));
}

export function readSession() {
    return JSON.parse(sessionStorage.getItem('sessionData'));
}

export function getCampaign() {
    return JSON.parse(sessionStorage.getItem('currentCampaign'));
}

export function getSessionToken() {
    console.log('Calling getSessionToken');
    const data = JSON.parse(sessionStorage.getItem('sessionData'));
    if (data === null) {
        return null;
    }
    console.log('sessionData', data);

    return data.id;
}

export function getUsername() {
    console.log('Calling getUsername');
    const data = JSON.parse(sessionStorage.getItem('sessionData'));

    return data.username;
}

export function getUserId() {
    console.log('Calling getUserId');
    const data = JSON.parse(sessionStorage.getItem('sessionData'));

    return data.userId;
}

export function getOverlordName() {
    console.log('Calling getOverlordName');
    const data = JSON.parse(sessionStorage.getItem('currentCampaign'));

    return data.overlord.playedBy.username;
}

export function getCampaignId() {
    console.log('Calling getCampaignId');
    const data = JSON.parse(sessionStorage.getItem('currentCampaign'));

    return data.id;
}

export function isSessionActive() {
    let isActive = false;
    if (readSession()) {
        isActive = true;
    }

    return isActive;
}

export function endSession() {
    sessionStorage.clear();
}