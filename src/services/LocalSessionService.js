export function storeSession(data) {
    sessionStorage.setItem('sessionData', JSON.stringify(data));
}

export function readSession() {
    return JSON.parse(sessionStorage.getItem('sessionData'));
}

export function getSessionToken() {
    console.log('Calling getSessionToken');
    const data = JSON.parse(sessionStorage.getItem('sessionData'));
    console.log('sessionData', data);

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