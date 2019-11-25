import axios from 'axios';

const BASE_URL = "http://localhost:8080/";

export class SkillRestService {


    static getAll() {
        return axios.get(`${BASE_URL}api/v1/skills`);
    }

    static create(worker) {
        return axios.post(`${BASE_URL}api/v1/skills`, worker);
    }

    static getById(id) {
        return axios.get(`${BASE_URL}api/v1/skills/${id}`);
    }

    static update(id,worker) {
        return axios.put(`${BASE_URL}api/v1/skills/${id}`, worker);
    }

    static delete(id) {
        return axios.delete(`${BASE_URL}api/v1/skills/${id}`);
    }

}
