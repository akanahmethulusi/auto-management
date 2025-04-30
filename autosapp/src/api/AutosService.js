import axios from "axios";

const API_URL = 'http://localhost:8080/autos';

export async function saveAuto(auto) {
    return await axios.post(API_URL, auto);
}

export async function getAutos(page = 0, size =8) {
    return await axios.get(`${API_URL}?page=${page}&size=${size}`);
}

export async function getAuto(id) {
    return await axios.get(`${API_URL}/${id}`);
}

export async function updateAuto(auto) {
    return await axios.post(API_URL, auto);
}

export async function updatePhoto(formData){
    return await axios.put(`${API_URL}/photo`, formData);
}

export async function deleteAuto(id){
    return await axios.delete(`${API_URL}/${id}`);
}