import http from "./httpService";
import config from "./config.json";

export const Register = data => {
    return http.post(`${config.api}/auth/register`,data)
}