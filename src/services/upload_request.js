import http from "./httpService";
import config from "./config.json";


export const uploadReguest = data => {
    return http.post(`${config.api}/camera/upload/`, data)
}
