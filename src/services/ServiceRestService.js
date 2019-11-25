import axios from 'axios';

const BASE_URL = "http://localhost:8080/";

export class ServiceRestService {


    static getAll() {
        return axios.get(`${BASE_URL}api/v1/services`);
    }

    static create(worker) {
        return axios.post(`${BASE_URL}api/v1/services`, worker);
    }

    static getById(id) {
        return axios.get(`${BASE_URL}api/v1/services/${id}`);
    }

    static update(id,worker) {
        return axios.put(`${BASE_URL}api/v1/services/${id}`, worker);
    }

    static delete(id) {
        return axios.delete(`${BASE_URL}api/v1/services/${id}`);
    }

}
