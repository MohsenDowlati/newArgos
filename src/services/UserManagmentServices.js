import http from "./httpService";
import config from "./config.json";
import axios from "axios";


export const getUsers = page =>{
    const token = localStorage.getItem('AccessToken')
    if (token) {
        console.log(token)
        axios.defaults.headers.post['Authorization'] = `Bearer ${token}`;
    }



    //return http.get(`${config.api}/auth/users/`,{params:{page}})
    return http.get(`${config.api}/group/data/`,{params:{page}});
}
export const deleteUsers = id => {
    return http.delete(`${config.api}/auth/users/${id}/`)
}
export const VerifyUsers = (id,data) => {
    return http.put(`${config.api}/auth/users/${id}/verify/`,data)
}