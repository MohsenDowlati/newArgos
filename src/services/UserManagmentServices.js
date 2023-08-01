import http from "./httpService";
import config from "./config.json";


export const getUsers = page =>{
    return http.get(`${config.api}/auth/users/`,{params:{page}})
}
export const deleteUsers = id => {
    return http.delete(`${config.api}/auth/users/${id}/`)
}
export const VerifyUsers = (id,data) => {
    return http.put(`${config.api}/auth/users/${id}/verify/`,data)
}