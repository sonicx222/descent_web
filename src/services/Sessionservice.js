export function storeSession(data) {
    sessionStorage.setItem('sessionData', data);
}

export function readSession() {
    return sessionStorage.getItem('sessionData');
}

export function getSessionToken() {
    return sessionStorage.getItem('sessionData').token;
}

export function isSessionActive() {
    let isActive = false;
    if (readSession()) {
        isActive = true;
    }

    return isActive;
}

export function endSession() {
    sessionStorage.removeItem('sessionData');
}