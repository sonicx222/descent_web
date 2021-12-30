import { post } from './base';

export function authenticate(requestData) {
    return post("/sessions", requestData);
}