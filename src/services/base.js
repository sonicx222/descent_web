import Axios from "axios";

function returnAxiosInstance() {
    const instance = Axios.create({
        baseURL: 'https://europe-west3-extended-line-332107.cloudfunctions.net/descent_app'
        //baseURL: 'http://localhost:8080'
    });
    // alter defaults after instance has been created
    instance.defaults.headers.post['Content-Type'] = 'application/json';
    instance.defaults.headers.put['Content-Type'] = 'application/json';

    return instance;
}

export async function get(url, config) {
    const axios = returnAxiosInstance();
    return await axios.get(url, config);
}

export async function post(url, requestData, config) {
    const axios = returnAxiosInstance();
    return await axios.post(url, requestData, config);
}

export async function del(url, config) {
    const axios = returnAxiosInstance();
    return await axios.delete(url, config);
}