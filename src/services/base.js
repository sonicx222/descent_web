import Axios from "axios";

function returnAxiosInstance() {
    const instance = Axios.create({
        // baseURL: 'https://europe-west3-extended-line-332107.cloudfunctions.net/descent_app',
        baseURL: 'http://localhost:8080'
    });
    // alter defaults after instance has been created
    instance.defaults.headers.post['Content-Type'] = 'application/json';
    instance.defaults.headers.put['Content-Type'] = 'application/json';

    return instance;
}

export function get(url) {
    const axios = returnAxiosInstance();
    return axios.get(url);
}

export function post(url, requestData, config) {
    const axios = returnAxiosInstance();
    return axios.post(url, requestData, config);
}