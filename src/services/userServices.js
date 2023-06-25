import http from "./httpService";
import config from "./config.json";

export const counselingService = user => {
    return http.post(`${config.api}/auth/counseling/`, user)
}

export const loginService = data => {
    return http.post(`${config.api}/auth/login/`, data)
}
export const registerService = data => {
    return http.post(`${config.api}/auth/register/`, data)
}
export const resetPassword = data =>{
    return http.post(`${config.api}/auth/request-reset-email/`,data)
}