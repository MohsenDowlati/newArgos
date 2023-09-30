import http from "./httpService";
import config from "./config.json";
import axios from "axios";


export const getUsers = page =>{
    const token = localStorage.getItem('AccessToken')
    return http.get(`${config.api}/group/data/`, { headers: {
            Authorization: `Bearer ${token}`,
        },})
}
export const deleteUsers = id => {
    return http.delete(`${config.api}/auth/users/${id}/`)
}
export const VerifyUsers = (id,data) => {
    return http.put(`${config.api}/auth/users/${id}/verify/`,data)
}