export function storeSession(data) {
    sessionStorage.setItem('sessionData', JSON.stringify(data));
}

export function storeCampaign(data) {
    sessionStorage.setItem('currentCampaign', JSON.stringify(data));
}

export function storeActiveQuest(data) {
    sessionStorage.setItem('activeQuest', JSON.stringify(data));
}

export function storeQuestMap(data) {
    sessionStorage.setItem('activeQuestMap', JSON.stringify(data));
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

export function getActiveQuest() {
    return JSON.parse(sessionStorage.getItem('activeQuest'));
}

export function getQuestMap() {
    return JSON.parse(sessionStorage.getItem('activeQuestMap'));
}

export function getSessionToken() {
    const data = JSON.parse(sessionStorage.getItem('sessionData'));
    if (data === null) {
        return null;
    }

    return data.id;
}

export function getUsername() {
    const data = JSON.parse(sessionStorage.getItem('sessionData'));

    return data.username;
}

export function getUserId() {
    const data = JSON.parse(sessionStorage.getItem('sessionData'));

    return data.userId;
}

export function getOverlordName() {
    const data = JSON.parse(sessionStorage.getItem('currentCampaign'));

    return data.overlord.playedBy.username;
}

export function getCampaignId() {
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