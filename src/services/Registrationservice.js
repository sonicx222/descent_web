import { post } from './base';

export function registerUser(requestData) {
    return post("/users", requestData);
}