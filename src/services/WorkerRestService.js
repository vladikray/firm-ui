import axios from 'axios';

const BASE_URL = "http://localhost:8080/";

export class WorkerRestService {


    static getAll() {
        return axios.get(`${BASE_URL}api/v1/workers`);
    }

    static create(worker) {
        return axios.post(`${BASE_URL}api/v1/workers`, worker);
    }

    static getById(id) {
        return axios.get(`${BASE_URL}api/v1/workers/${id}`);
    }

    static update(id,worker) {
        return axios.put(`${BASE_URL}api/v1/workers/${id}`, worker);
    }

    static delete(id) {
        return axios.delete(`${BASE_URL}api/v1/workers/${id}`);
    }

}
