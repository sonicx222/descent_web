import { post } from './base';

export function registerUser(requestData) {
    console.log("Register user", requestData);
    return post("/users", requestData);
}