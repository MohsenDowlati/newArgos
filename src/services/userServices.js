import http from "./httpService";
import config from "./config.json";

export const counselingService = user => {
    return http.post(`${config.api}/auth/counseling/`, user)
}